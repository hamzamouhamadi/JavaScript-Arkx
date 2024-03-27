import Layouts from "./components/Layouts";
import AddBlog from "./components/AddBlog";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditBlog from "./components/EditBlog";
import LogedHome from "./components/logedHome";

function App() {

  return (
      <div>
        <Routes>
          <Route
            path="/"
            element={<Layouts/>}
          />
          <Route
            path="/addBlog"
            element={<AddBlog/>}
          />
          <Route
            path="/editblog/:id"
            element={<EditBlog/>}
          />
          <Route
            path="/signin"
            element={<SignIn  />}
          />
          <Route
            path="/signup"
            element={<SignUp  />}
          />
          <Route path="/logedhome" element={<LogedHome />} />
        </Routes>
      </div>
  );
}

export default App;
