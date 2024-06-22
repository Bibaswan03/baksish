import React from 'react'
import Head from 'next/head'
import RouteControl from './RouteControl'
function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent  p-6">
      <Head>
        <title>My Account - Coming Soon</title>
        <meta name="description" content="Forgot Password Page - Coming Soon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className="bg-white rounded-lg shadow-lg p-10 max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Coming Soon</h1>
        <p className="mt-6 text-lg text-gray-700">
          We are working on this feature. In the meantime, please contact our backend team at
          <a
            href="mailto:baksish247@gmail.com"
            className="text-yellow-600 hover:underline ml-1"
          >
            @baksish247@gmail.com
          </a>
          &nbsp;to update any details for your account.
        </p>
      </main> */}
      <RouteControl/>
    </div>
  )
}

export default page