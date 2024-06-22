"use client"

import Menu from "./Menu";
import Enroll from "./Enroll";
import CustomerLink from "./CustomerLink";

function ResturantProfile(res_data) {
  //const res_id=res_data.res_data.res_id;
  
  const data = res_data.res_data;
  const resturant_id=res_data.res_id.res_id;
  

  return (
    <div>
    <div className="mt-2 pt-4 pb-4 px-2 lg:px-8">
        <Enroll/>
        <Menu data={resturant_id}/>
        
        <h1 className="lg:text-3xl text-xl  font-semibold text-center text-gray-800 bg-transparent py-0 px-6">
          My Employee List
        </h1>
        <div className="flex w-40 mt-1 mb-6 overflow-hidden rounded   mx-auto ">
            <div className="flex-1 h-2 bg-yellow-200"></div>
            <div className="flex-1 h-2 bg-yellow-400"></div>
            <div className="flex-1 h-2 bg-yellow-200"></div>
          </div>
          {data.length>0 &&<><div className="lg:max-w-6xl max-w-screen mx-auto bg-transparent rounded-lg shadow-md overflow-x-auto">
          <div className="pt-1 px-1 ">
            <table className="w-full table-auto mb-6">
              <thead>
                <tr className=" bg-[#fdff97] text-justify text-lg font-medium text-gray-800">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Phone</th>
                  <th className="py-2 px-4">Upi Id</th>
                </tr>
              </thead>
              {data &&<tbody className="text-gray-700 text-base">
                {data.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#f2f2f1] border-b-2 border-[#f2f2f1] shadow-sm text-justify"
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.email}</td>
                    <td className="py-2 px-4">{item.phone}</td>
                    <td className="py-2 px-4">{item.upi_id}</td>
                  </tr>
                ))}

                {/* Add more rows here */}
              </tbody>}
            </table>
            
          </div>
        </div>
        <h2 className="lg:text-base text-sm font-normal text-center text-gray-800 bg-transparent py-4 px-6">
          To edit employee details or to delete an employee , please contact our
          backend team.
        </h2></>}
        {data.length==0 &&<h2 className="lg:text-base text-sm font-medium text-center text-gray-800 bg-transparent  pb-4 px-6">
          Currently, you don't have any employee registered with Baksish. Enroll them and help them earn more.
        </h2>

            }
            <CustomerLink data={resturant_id}/>
      </div>
    </div>
  );
}

export default ResturantProfile;
