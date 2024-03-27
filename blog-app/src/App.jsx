import Layouts from "./components/Layouts";
import AddBlog from "./components/AddBlog";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditBlog from "./components/EditBlog";
import LogedHome from "./components/logedHome";

function App() {
  const [blogs, setblogs] = useState([
    {
      id: 1,
      title: "AI in Healthcare",
      description:
        "AI is transforming healthcare with diagnosis assistance, treatment optimization, and patient monitoring.",
    },
    {
      id: 2,
      title: "Renewable Energy Tech",
      description:
        "Discover the latest innovations in solar, wind, and hydroelectric power.",
    },
    {
      id: 3,
      title: "Renewable Energy Tech",
      description:
        "Discover the latest innovations in solar, wind, and hydroelectric power.",
    },
  ]);

  const [user, setuser] = useState([
    { fullName: "hamza", email: "hamza@gmail.com", password: "hamza123" },
    { fullName: "mohammed", email: "user@gmail.com", password: "mohammed123" },
  ]);

  return (
      <div>
        <Routes>
          <Route
            path="/"
            element={<Layouts blogs={blogs} setblogs={setblogs} />}
          />
          <Route
            path="/addBlog"
            element={<AddBlog blogs={blogs} setblogs={setblogs} />}
          />
          <Route
            path="/editblog/:id"
            element={<EditBlog blogs={blogs} setblogs={setblogs} />}
          />
          <Route
            path="/signin"
            element={<SignIn users={user} setusers={setuser} />}
          />
          <Route
            path="/signup"
            element={<SignUp users={user} setusers={setuser} />}
          />
          <Route path="/logedhome" element={<LogedHome />} />
        </Routes>
      </div>
  );
}

export default App;
