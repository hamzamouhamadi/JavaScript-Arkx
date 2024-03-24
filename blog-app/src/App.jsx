import Layouts from './components/Layouts';
import AddBlog from './components/AddBlog';
import { useState } from 'react';
import { Route ,Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditBlog from './components/EditBlog';

function App() {
  const [blogs, setblogs] = useState([
    { id : 1,
      title: "AI in Healthcare",
      description: "AI is transforming healthcare with diagnosis assistance, treatment optimization, and patient monitoring."
    },
    { id : 2,
      title: "Renewable Energy Tech",
      description: "Discover the latest innovations in solar, wind, and hydroelectric power."
    },
    { id : 3,
      title: "Renewable Energy Tech",
      description: "Discover the latest innovations in solar, wind, and hydroelectric power."
    }
  ]);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layouts blogs={blogs} setblogs={setblogs} />}/>
        <Route path='/addBlog' element={<AddBlog blogs={blogs} setblogs={setblogs}/>}/>
        <Route path='/editblog/:id' element={<EditBlog blogs={blogs} />}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
