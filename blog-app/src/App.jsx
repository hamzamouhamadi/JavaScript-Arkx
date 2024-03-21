import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import { useState } from 'react';

function App(props) {
  const [isLogged, setisLogged] = useState(false)
  
  const handelLogin = ()=>{
  setisLogged(!isLogged);
  }
  return (
    <div>
      <Header links={props.navLinks} isLogged={isLogged} handelLogin={handelLogin} color={props.color} />
      <MainContent posts={props.posts}/>
      <Footer/>
    </div>
  )
}

export default App
