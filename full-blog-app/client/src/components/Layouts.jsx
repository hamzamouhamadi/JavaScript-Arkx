import React, { useContext } from "react";
import Header from "./Header";
import '../App.css'
import MainContent from "./MainContent";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

export default function Layouts(props) {
  const loggedIn = useSelector(state => state.users.loggedIn);
  return (
    <div >
      {!loggedIn
        ?<>
          <NavBar loged={props.loged} setLoged={props.setLoged}/>
          <Header/>
          <MainContent />
          <Footer/>
        </>
        :
        <>
          <NavBar loged={props.loged} setLoged={props.setLoged}/>
          <MainContent />
          <Footer/>
        </>
      }
    </div>
  );
}