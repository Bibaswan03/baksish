import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toaster,toast } from "react-hot-toast";

const ResturantAccount = ({ data }) => {
  //console.log(data.email);

  const [details, setDetails] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.city + ", " + data.state,
  });

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const schema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
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
  // console.log(initialValues,values,errors)

  const handlesubmit_for_passwordchange = async (v) => {
    
    const request = await fetch("/api/updatepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: v.currentPassword,
        newpassword: v.newPassword,
      }),
    });
    const response = await request.json();
    if (response.success) {
      toast.success("Password updated successfully");
    } else if (response.error == "Current password incorrect") {
      toast.error("Current password entered is incorrect");
    } else {
      toast.error("Unexpected error occured. Please try after some time");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-cover flex p-4 justify-center items-center">
        <Toaster/>
      <div className="bg-white p-8 rounded-xl shadow-xl lg:w-1/2 w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Account Details
        </h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={details.name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={details.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={details.phone}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={details.address}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>

          <div className="border-t pt-6 space-y-3">
            <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.currentPassword ? "border-red-500" : ""
                }`}
              />
              {errors.currentPassword && touched.currentPassword && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.currentPassword}
                </div>
              )}
            </div>
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
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={Object.keys(errors).length > 0}
              className="bg-yellow-300 hover:bg-yellow-200 disabled:cursor-not-allowed text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResturantAccount;
