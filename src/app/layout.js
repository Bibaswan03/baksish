import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
//import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });
import Script from 'next/script'

export const metadata = {
  title: "Baksish | Your Gateway To Appreciation",
  description: "Effortlessly show appreciation by tipping waiters on our platform. Simple, secure, and hassle-free transactions",
};

export default function RootLayout({ children }) {
  return (<>
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        {/* <NextTopLoader color="#14B8A6" initialPosition={0.08} height={3} /> */}
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"
    />
    </>
  );
}
