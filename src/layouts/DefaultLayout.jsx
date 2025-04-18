import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import LoaderContext from "../contexts/loaderContext";
import { useContext } from "react";

export default function DefaultLayout() {

  const { isLoading } = useContext(LoaderContext);

  return (
    <>
      <Header></Header>
      <main>
        {
          isLoading && (
            <Loader></Loader>
          )
        }
        <Outlet></Outlet>
      </main >
      <Footer></Footer>
    </>
  );
}