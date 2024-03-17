import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BookList from "../pages/BookList";

const RouteConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteConfig;
