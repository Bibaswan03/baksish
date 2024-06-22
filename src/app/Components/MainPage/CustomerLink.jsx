import React, { useEffect, useState} from "react";
import QRcode from "./QRcode";


function CustomerLink(data) {
  const [link, setlink] = useState("");
  const [linkgenerated, setlinkgenerated] = useState(false);
  const arrow = ">>";
  useEffect(() => {
    const req_key = data.data;
    const req_data = {
      key: req_key,
    };
    const get_res_data = async () => {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getresturantname`,
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
        let res1 = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getdashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: resdata.data.id,
              name: resdata.data.name,
            }),
          }
        );
        const resdata1 = await res1.json();
        if (resdata1.success) {
          setlink(
            `${process.env.NEXT_PUBLIC_VERCEL_URL}/Dashboard?name=${resdata.data.name}&ID=${resdata.data.id}`
          );
          setlinkgenerated(true);
        } else {
          setlinkgenerated(false);
        }
      } else {
        setlinkgenerated(false);
      }
    };
    get_res_data();
  }, []);
  const submit_clicked = () => {
    window.open(link, "_blank");
  };
  
    
  return (
    <div className="mb-10 mt-20 mx-4">
      <div className="text-center">
        <h1 className="lg:text-3xl text-xl mb-1 font-semibold text-center text-gray-800 bg-transparent py-0 ">
          View Your website
        </h1>
        <div className="flex w-40 mt-1 mb-3 overflow-hidden rounded   mx-auto ">
          <div className="flex-1 h-2 bg-yellow-200"></div>
          <div className="flex-1 h-2 bg-yellow-400"></div>
          <div className="flex-1 h-2 bg-yellow-200"></div>
        </div>
      </div>
      <h1 className="lg:text-base text-sm mb-2 font-medium text-center text-gray-800 bg-transparent py-2 px-6">
        Have a look how your website appears to your customers
      </h1>
      {linkgenerated && link && (<>
        <div className="flex justify-center space-x-6 items-center">
          <button
            type="button"
            onClick={submit_clicked}
            className="inline-flex items-center px-5 py-2.5 me-2 mb-2 text-sm font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-lg hover:bg-yellow-200 hover:scale-95    "
          >
            View Website&nbsp;{arrow}
          </button>
          
          
        </div>
        <QRcode url={link}/>
        </>
      )}
      {!linkgenerated && (
        <h1 className="lg:text-base text-sm mb-2 font-normal text-center text-gray-800 bg-transparent px-6">
          The link is not available currently. Please enroll employees to
          activate your own URL.
        </h1>
      )}
    </div>
  );
}

export default CustomerLink;
