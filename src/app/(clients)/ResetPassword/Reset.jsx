"use client"
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toaster,toast } from "react-hot-toast";

function Reset() {
    const searchparams=useSearchParams();
    const token=searchparams.get("token");
    const router=useRouter();
    if(!token)
      {
        router.push("/LoginResturant")
        
      }    
    const handlesubmit_for_passwordchange=async(v)=>{
        const request = await fetch("/api/verifyforgetlink", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token:token,
              password:v.newPassword
            }),
          });
          const response=await request.json();
          console.log(response);
          if(response.success)
            {
                toast.success("Password changed");
                window.location=`${process.env.NEXT_PUBLIC_VERCEL_URL}/LoginResturant`;
            }
            else if(response.error=="link expired")
            {
                toast.error("The link has expired. Please try again with a new link.")
            }
            else
            {
                toast.error("Unexpected error. Please try again with a new link.")
            }
    }


    const initialValues = {
        newPassword: "",
        confirmPassword: "",
      };
    
      const schema = Yup.object().shape({
        newPassword: Yup.string().min(
          6,
          "Password must be at least 6 characters long"
        ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
          .required("Confirm password is required"),
      });
      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
          initialValues,
          validationSchema: schema,
          onSubmit: (values, action) => {
            handlesubmit_for_passwordchange(values);
            action.resetForm();
          },
        });
  return (
    <>
      <div className="min-h-screen -mt-10 flex items-center justify-center bg-transparent">
        <Toaster/>
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
          <form className="space-y-6">
          <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              {errors.newPassword && touched.newPassword && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.newPassword}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={Object.keys(errors).length > 0}
                className="w-full py-2 px-4 bg-yellow-300 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-lg shadow-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Reset;