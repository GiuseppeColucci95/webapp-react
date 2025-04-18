import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import DefaultLayout from "./layouts/DefaultLayout";

import LoaderContext from "./contexts/loaderContext";

function App() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path='/' Component={HomePage}></Route>
            <Route path='/movies/:id' Component={MovieDetails}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LoaderContext.Provider>
  )
}

export default App;
