import React from "react";
import { CgProfile } from "react-icons/cg";
function Enroll() {
  return (
    <div className="mb-20 mt-6 mx-4">
      <div className="text-center">
        <h1 className="lg:text-3xl text-xl mb-1 font-semibold text-center text-gray-800 bg-transparent py-0 ">
          Enroll an employee
        </h1>
        <div className="flex w-40 mt-1 mb-3 overflow-hidden rounded   mx-auto ">
            <div className="flex-1 h-2 bg-yellow-200"></div>
            <div className="flex-1 h-2 bg-yellow-400"></div>
            <div className="flex-1 h-2 bg-yellow-200"></div>
          </div>
      </div>
      <h1 className="lg:text-base text-sm mb-2 font-medium text-center text-gray-800 bg-transparent py-2 px-6">
        Get your employee enrolled in out platform. Help him get appreciated for his work.
      </h1>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => {
            window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/EnrollEmployee`;
          }}
          className="inline-flex items-center px-5 py-2 me-2 mb-2 text-base font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-lg hover:bg-yellow-200 hover:scale-95    "
        >
          <CgProfile />
          &nbsp;Enroll
        </button>
      </div>
    </div>
  );
}

export default Enroll;
