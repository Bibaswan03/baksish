import Image from "next/image";

import VariableNavbar from "./Components/VariableNavbar/VariableNavbar";
import Mainpage from "./Components/MainPage/Mainpage";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div><VariableNavbar/>
      <div className="mt-20">
      <Mainpage/></div></div>
   </main>
  );
}
