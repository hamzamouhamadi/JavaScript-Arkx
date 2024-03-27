import React, { useContext } from "react";
import Header from "./Header";
import '../App.css'
import MainContent from "./MainContent";
import Footer from "./Footer";

export default function Layouts(props) {
  return (
    <div >
      <Header/>
      <MainContent blogs={props.blogs} setblogs={props.setblogs}/>
      <Footer/>
    </div>
  );
}