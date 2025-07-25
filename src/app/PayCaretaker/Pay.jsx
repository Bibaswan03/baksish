"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { decrypt } from "../(functions)/encryption";
import Image from "next/image";
import PaymentButton from "./PaymentButton";
let data;

function Pay() {
  const searchParams = useSearchParams();
  const encoded_id = searchParams.get("id");
  const id = decrypt(encoded_id);
  const [failed, setfailed] = useState(false);
  const [passed, setpassed] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const get_employee = async () => {
      let request = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getspecificemployee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emp_id: id }),
        }
      );
      const response = await request.json();

      if (response.success) {
        data = response.data;
        setloading(false);
        setpassed(true);
      } else {
        setloading(false);
        setfailed(true);
      }
    };
    get_employee();
  }, []);

  return (
    <div>
      {passed && (
        <div className="bg-transparent -mt-6">
          <div className="my-10 flex justify-center items-center"></div>
          <div className="flex items-center justify-center">
          <h1 className="text-lg text-center italic">Praise <strong>{data?.name}</strong>'s Excellent Service</h1>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Image
              className="h-64 w-64 max-w-full object-cover object-top rounded-full hover:cursor-pointer"
              src={data?.photo || ""}
              width={150}
              height={150}
              alt="Loading"
            />
          </div>

          <PaymentButton emp_data={data} emp_id={id} />
        </div>
      )}
      {failed && (
        <div className="flex flex-col justify-center items-center h-screen mx-2 -mt-10">
          <h1 className="text-4xl">Oops...</h1>
          <h1 className="text-xl text-center mt-4">
            There might be some issue with the URL . Check it and load the page
            again.
          </h1>
        </div>
      )}
      {loading && (
        <div className="min-h-screen flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="text-center mt-10 mb-10">
        <p className="text-lg font-semibold font-serif text-yellow-700">
          "&nbsp;Your gateway to Appreciation&nbsp;"
        </p>
      </div>
    </div>
  );
}

export default Pay;
