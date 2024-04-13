import Layouts from "./components/Layouts";
import AddBlog from "./pages/AddBlog";
import { Routes,Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditBlog from "./pages/EditBlog";
import Users from "./pages/Users";
import MyBlogs from "./pages/MyBlogs";
import BlogDetails from "./pages/BlogDetails";
import UserPosts from "./pages/UserBlogs";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./context";
import ProtectedRoute from "./ProtectedRoutes/Protected";
import AuthRoute from './ProtectedRoutes/AuthRoute';

function App() {
  const [loged, setLoged] = useState(false);

  return (
    <div>
        <Routes>
          <Route path="/" element={<Layouts setLoged={setLoged} loged={loged}/>} />
          <Route path="/signin" element={<SignIn setLoged={setLoged}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addBlog" element={<ProtectedRoute element={<AddBlog />} />} />
          <Route path="/editblog/:id" element={<ProtectedRoute element={<EditBlog />} />} />
          <Route path="/authors" element={<Users />} />
          <Route path="/MyBlogs" element={<ProtectedRoute element={<MyBlogs />} />} />
          <Route path="/BlogDetails/:id" element={<BlogDetails />} />
          <Route path="/UserBlogs/:id" element={<UserPosts />} />
          <Route path="/Profile" element={<ProtectedRoute element={<ProfilePage />} />}/>
        </Routes>
    </div>
  );
}

export default App;
