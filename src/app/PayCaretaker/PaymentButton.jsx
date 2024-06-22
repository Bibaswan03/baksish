import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "../Test/page";

const PaymentButton = (empdata) => {
  const router = useRouter();
  const [comment_for_waiter, setCommentForWaiter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [getLink, setGetLink] = useState(false);
  const [validAmount, setValidAmount] = useState(false);
  const [googleReviewLink, setGoogleReviewLink] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // New state for payment processing

  useEffect(() => {
    const getResturant = async () => {
      let request = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getspecificresturant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ res_id: empdata.emp_data.res_id }),
        }
      );
      const response = await request.json();

      if (response.success) {
        setGoogleReviewLink(response.data.reviewlink);
        setGetLink(true);
      } else {
        setGetLink(false);
      }
    };
    getResturant();
  }, [empdata.emp_data.res_id]);

  const handlePayment = async () => {
    setIsLoading(true);

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseInt(amount) * 100,
        reciept: empdata.emp_id,
      }),
    });
    const data = await res.json();

    if (!data) {
      setIsLoading(false);
      return;
    }

    if (data.id) {
      const initiateTransactionToDatabase = await fetch(
        "/api/prepaymentDatabase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: data.id,
            name: empdata.emp_data.name,
            email: empdata.emp_data.email,
            phone: empdata.emp_data.phone,
            description: comment_for_waiter.length > 0 ? comment_for_waiter : "Have a good day!",
            amount: amount,
            emp_id: empdata.emp_id,
            res_id: empdata.emp_data.res_id,
          }),
        }
      );
      const res_initiateTransactionToDatabase = await initiateTransactionToDatabase.json();

      if (res_initiateTransactionToDatabase.success) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Baksish",
          description: comment_for_waiter,
          image: "https://i.ibb.co/GdjdKb9/Untitled-design-2.png",
          order_id: data.id,
          handler: async function (response) {
            setIsProcessingPayment(true); // Show loader during payment processing
            const verificationRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: data.id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verificationData = await verificationRes.json();
            if (verificationData.status) {
              router.push(googleReviewLink);
            } else {
              alert("Payment verification failed");
              window.location.reload();
            }
            setTimeout(() => {
              setIsProcessingPayment(false); // Hide loader after payment processing
            }, 3000);//Remove the loader after coming back from the next page
          },
          prefill: {
            name: empdata.emp_data.name,
            email: "baksish247@gmail.com",
            contact: empdata.emp_data.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
            empid: empdata.emp_id,
          },
          theme: {
            color: "#fde047",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        setIsLoading(false);
      }
    } else {
      alert("Failed to initiate payment. Please reload the page and try again.");
    }
  };

  return (
    <div className="text-center">
      {isProcessingPayment && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-lg">
          <Loader/>
          <span className="text-white mt-2">Verifying your payment <br/> Do not close the window</span>
        </div>
      )}
      <div className="mt-10 mb-4">
        <h1 className="text-center text-md mb-2">Enter amount (in ₹) :</h1>
        <input
          type="number"
          id="amount"
          placeholder="100"
          onChange={(e) => {
            setAmount(e.target.value);
            if (e.target.value.length > 1) {
              setValidAmount(true);
            } else {
              setValidAmount(false);
            }
          }}
          value={amount}
          className="flex justify-center items-center max-w-[44%] mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-yellow-500 focus:border-yellow-500"
        />
        {!validAmount && (
          <p className="text-[0.65rem] pt-1 text-yellow-800">
            To proceed payment, amount should be more than 10
          </p>
        )}
      </div>
      <div className="mb-6">
        <h1 className="text-center text-md mb-2">Enter your comments :</h1>
        <textarea
          id="comments"
          placeholder="Write your comments here..."
          onChange={(e) => setCommentForWaiter(e.target.value)}
          value={comment_for_waiter}
          className="flex justify-center items-center w-[60%] mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-yellow-500 focus:border-yellow-500"
          rows="2"
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={!validAmount}
        className="bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed max-w-[40%] mx-auto hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded"
      >
        {isLoading ? "Loading..." : "Pay"}
      </button>
    </div>
  );
};

export default PaymentButton;
