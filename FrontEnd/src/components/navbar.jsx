import { Link, Outlet} from "react-router-dom"
import style from "../styles/navBar.module.css"
import {AuthContext} from "./authContext.jsx"
import {useContext} from "react"
import { useNavigate } from "react-router-dom"
import {logout} from "../services/auth.js"

export default function Navbar() {
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();    

    const handleLogout = async (e) => {
        try{
            const response = await logout();
            localStorage.removeItem('token');
            setAuth({
                token: null,
                isadmin: false
            });
            navigate('/login')
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className={style.navBar} >
                <h1 className={style.headerNav}>BlogPosts</h1>
                <div className={style.buttonContainer}>
                    <Link className={style.navButton} to="/posts">POSTS</Link>
                    { auth.token ? (<Link className={style.navButton} onClick={handleLogout}>LOGOUT</Link>) 
                    : (
                        <>
                        <Link className={style.navButton} to="/register">REGISTER</Link> 
                        <Link className={style.navButton} to='/login'>SIGN IN</Link>
                        </>
                    )}
                    
                </div>
            </div>
            <Outlet />
        </>
    )
}