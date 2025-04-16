import { Route, Routes, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path='/' Component={HomePage}></Route>
          <Route path='/movies/:id' Component={MovieDetails}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
