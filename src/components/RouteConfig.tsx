import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const RouteConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteConfig;
