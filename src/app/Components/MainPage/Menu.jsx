"use client";
import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { FaRegEye } from "react-icons/fa";

function Menu(data) {
  const key = data.data;
  const [loading, setloading] = useState(false);
  const [pdf, setpdf] = useState();
  const [pdftype, setpdftype] = useState();
  const [uploadfile, setuploadfile] = useState(false);
  const [uploaddone, setuploaddone] = useState(false);
  const [menupresent, setmenupresent] = useState(false);
  const [menunotpresent, setmenunotpresent] = useState(false);
  useEffect(() => {
    const req_key = data.data;
    const req_data = {
      key: req_key,
    };
    const get_menu = async () => {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/awsapimenucheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req_data),
        }
      );
      const resdata = await res.json();
      if (resdata.success) {
        setmenupresent(true);
      } else {
        setmenunotpresent(true);
      }
    };
    get_menu();
  }, []);

  const submit = async () => {
    setloading(true);
    const data = {
      key: key,
      type: pdftype,
    };
    let put_response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/awsapimenuput`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const put_resdata = await put_response.json();
    const put_url = put_resdata.url;
    
    let response = await fetch(put_url, {
      method: "PUT",
      headers: {
        "Content-Type": pdftype,
      },
      body: pdf,
    });
    const result = response.text();
    
    
    window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  };
  const viewmenu = () => {
    window.open(
      `https://tipppz-res-menu.s3.ap-south-1.amazonaws.com/${key}.pdf`,
      "_blank"
    );
  };
  return (
    
    <div className="mb-20">
      {loading && (
        <div className="min-h-screen z-50 backdrop-blur-sm flex justify-center items-center">
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
      <h1 className="lg:text-3xl text-xl font-semibold text-center text-gray-800 bg-transparent py-0 px-6">
        My Menu Card
      </h1>
      <div className="flex w-40 mt-1 mb-3 overflow-hidden rounded   mx-auto ">
            <div className="flex-1 h-2 bg-yellow-200"></div>
            <div className="flex-1 h-2 bg-yellow-400"></div>
            <div className="flex-1 h-2 bg-yellow-200"></div>
          </div>
      {menupresent && (
        <div className="">
          <h1 className="lg:text-base text-sm mb-2 font-medium text-center text-gray-800 bg-transparent py-2 px-6">
            You already have an existing menu card for your restaurant.  
            However, you can update your menu card anytime.
          </h1>

          {!uploadfile && (
            <>
              <div className="flex justify-center items-center gap-6">
                <button
                  type="button"
                  onClick={viewmenu}
                  className="flex justify-center items-center text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  <FaRegEye/> &nbsp;&nbsp;View Menu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setuploadfile(true);
                  }}
                  className="flex justify-center items-center text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  <GrUpdate/>&nbsp;&nbsp;Update Menu
                </button>
              </div>
            </>
          )}
          {uploadfile && (
            <>
              {!uploaddone && (
                <>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-72 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center py-4">
                        <svg
                          className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or
                          <span className="font-semibold">
                            {" "}
                            drag and drop
                          </span>{" "}
                          PDF
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setpdf(e.target.files?.[0]);
                          setpdftype(e.target.files?.[0].type);
                          
                          setuploaddone(true);
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex mt-2 justify-center items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setuploadfile(false);
                      }}
                      className=" text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {uploaddone && (
                <>
                  <div className="flex items-center justify-center w-auto text-center text-sm text-gray-800">
                    File : {pdf.name}
                  </div>
                  <div className="flex mt-2 justify-center items-center">
                    <button
                      type="button"
                      onClick={submit}
                      className=" text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setuploaddone(false);
                      }}
                      className=" text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
      {menunotpresent && (
        <div className="">
          <h1 className="lg:text-base text-sm mb-2 font-medium text-center text-gray-800 bg-transparent py-2 px-6">
            You have not uploaded any menu card for your restaurant. Please
            upload your menu card in pdf format for customer view.
          </h1>

          {!uploadfile && (
            <>
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    setuploadfile(true);
                  }}
                  className="flex justify-center items-center text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  Upload Menu
                </button>
              </div>
            </>
          )}
          {uploadfile && (
            <>
              {!uploaddone && (
                <>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-72 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center py-4">
                        <svg
                          className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or
                          <span className="font-semibold">
                            {" "}
                            drag and drop
                          </span>{" "}
                          PDF
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setpdf(e.target.files?.[0]);
                          setpdftype(e.target.files?.[0].type);
                          setuploaddone(true);
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex mt-2 justify-center items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setuploadfile(false);
                      }}
                      className=" text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {uploaddone && (
                <>
                  <div className="flex items-center justify-center w-auto text-center text-sm text-gray-800">
                    File : {pdf.name}
                  </div>
                  <div className="flex mt-2 justify-center items-center">
                    <button
                      type="button"
                      onClick={submit}
                      className=" text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setuploaddone(false);
                      }}
                      className=" text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
