import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Profile from "../Components/Profile";
import ResetPassword from "../Components/ResetPassword";
import Signup from "../Components/Signup";
import UserList from "../Components/UserList";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} /> */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/userlist"
        element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        }
      />
      <Route path="/reset/:id/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default AllRoutes;
