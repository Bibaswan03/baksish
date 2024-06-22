"use client";
import Link from 'next/link';
import emailjs from 'emailjs-com';
import React from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";

const validator = require("email-validator");

const Forgot = () => {
  const [loading, setloading] = useState(false);
  // const [email, setemail] = useState("");
  // const [validemail, setvalidemail] = useState(true);
  const initialValues = {
    email: "",
  };

  const schema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email"),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit: (values, action) => {
        toast.promise(
          generatelink(values),
          {
            loading: 'Sending email...',
            success: <b>Email sent. Please check your inbox!</b>,
            error: <b>Could not send email. Try again later</b>,
          },
          {
            duration: 30000, // Toast duration in milliseconds
          }
        );
        action.resetForm();
      },
    });
  
  const generatelink=async(v)=>{
    const request = await fetch("/api/generateforgetlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:v.email,
        }),
      });
      const response=await request.json();
      console.log(response);
      const linktosend=`${process.env.NEXT_PUBLIC_VERCEL_URL}/ResetPassword?token=${response.token}`
      sentemail(response.name,v.email,linktosend);
  }

  const sentemail = async(name,useremail,reset_link) => {
    const templateParams = {
      name: name,
      useremail: useremail,
      reset_link: reset_link,
    };
    console.log(templateParams)
    await emailjs
        .send(
          process.env.NEXT_PUBLIC_FORGOTPASSWORD_SERVICE,
          process.env.NEXT_PUBLIC_FORGOTPASSWORD_TEMPLATE,
          templateParams,
          process.env.NEXT_PUBLIC_API_KEY
        )    
    
    
}
  return (
    <div className="min-h-screen -mt-20 flex items-center justify-center bg-transparent">
        <Toaster/>
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center">Forgot Your Password?</h2>
        <p className="mt-4 text-gray-600 text-center">Enter your email address and we'll send you a link to reset your password.</p>
        <form className="mt-8 space-y-6" action="/send-reset-link" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
            <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Enter Email Address..."
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                        {errors.email}
                      </p>
                    ) : null}
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={Object.keys(errors).length > 0}
              className="group relative w-full flex disabled:cursor-not-allowed justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          
            <p className="text-gray-800 hover:cursor-pointer hover:text-yellow-500" onClick={()=>{window.location=`${process.env.NEXT_PUBLIC_VERCEL_URL}/LoginResturant`}}>Back to Login</p>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
