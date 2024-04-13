import { createContext, useState } from "react";

export const authentication = createContext(null)
const AuthProvider =(props)=>{
    const [auth, setAuth] = useState(false)
    const isAuth = ()=>{
        setAuth(!auth)
    }
    return(
        <div>
            <authentication.Provider value={{auth : auth , isAuth : isAuth}}>
                {props.children}
            </authentication.Provider>
        </div>
        
    )
}


export default AuthProvider