import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {

  return (
    <>
      <Header></Header>
      <main className="my-5">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}