import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BookList from "../pages/BookList";
import Profile from "../pages/Profile";
import NewReview from "../pages/NewReview";

const RouteConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewReview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteConfig;
