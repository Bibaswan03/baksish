import Head from 'next/head';

export default function page() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-10">
      <Head>
        <title>Refund Policy - Baksish</title>
        <meta name="description" content="Refund Policy of Baksish" />
      </Head>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>
        <p className="mb-4">
          Thank you for using Baksish, the platform connecting restaurant customers with waiters for convenient tipping. We strive to provide a seamless experience for all users. Please read our refund policy carefully.
        </p>
        <h2 className="text-2xl font-semibold mb-2">No Refunds for Successful Transactions</h2>
        <p className="mb-4">
          At Baksish, we facilitate transactions between customers and waiters for tipping purposes. Once a transaction is successfully processed and the tip is delivered to the intended waiter, we do not offer refunds. This policy is in place to ensure the efficiency and reliability of our platform.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Exceptional Circumstances</h2>
        <p className="mb-4">
          While our standard policy is no refunds for successful transactions, we understand that there may be exceptional circumstances. If you believe that you have a valid reason for requesting a refund despite a successful transaction, please contact our support team at 
          <a href="mailto:baksish247@gmail.com" className="text-blue-500"> baksish247@gmail.com</a> with detailed information about your situation. We will review your request on a case-by-case basis and strive to find a satisfactory solution.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about our refund policy, please don't hesitate to contact us at 
          <a href="mailto:baksish247@gmail.com" className="text-blue-500"> baksish247@gmail.com</a>. Our support team is here to assist you and ensure that your experience with Baksish is positive.
        </p>
      </div>
    </div>
  );
}
