import {createContext, useEffect, useState} from "react";
import {fecthUserLogged} from "../services/auth.js"

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [auth, setAuth] = useState(() => ({
        token: localStorage.getItem("token"),
        isadmin: false
    }));

    useEffect(() => {
            const controller = new AbortController();
    
            async function loadUser() {
                try {
                    if(auth.token){
                        localStorage.setItem('token', auth.token)
                        const response = await fecthUserLogged(auth, controller.signal);
                        
                        setAuth(prev => ({
                            ...prev,
                            isadmin: response.isadmin,
                        }));
                    } else {
                        localStorage.removeItem('token')
                    }
                    
                } catch(err) {
                    console.log(err);
                }
            }
            loadUser()
    
            return () => {
                controller.abort();
            }
    }, [auth.token])

    

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
                {children}
        </AuthContext.Provider>
    )
}