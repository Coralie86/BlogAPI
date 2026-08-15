import { useNavigate } from "react-router-dom"
import style from "../styles/register.module.css"
import {AuthContext} from "./authContext.jsx"
import {useContext, useState} from "react"
import {login} from "../services/auth.js"
import Errors from "./errors.jsx"


export default function Login() {
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);
    const [errors, setErrors] = useState([])
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            const form = e.target;
            const formData = new FormData(form);

            try {
                const response = await login(formData)
                const token = response.token;
                localStorage.setItem("token", token);
                setAuth({
                    token: response.token,
                    isadmin: response.isadmin
                });

                navigate('/posts');
                    
            } catch(err) {
                setErrors(err)
            }
    
        }
    
        return (
            <div className={style.registerMainContainer}>
                <div className={style.registerContainer}>Connect to your Account
                    <form className={style.registerForm} method="post" onSubmit={handleSubmit} >
                        <label htmlFor="email">Email
                            <input className={style.registerInput} id="email" name="email" type="email" required />
                        </label>
                        <label htmlFor="password">Password
                            <input className={style.registerInput} id="password" name="password"  type="password" required />
                        </label>
                        <button className={style.registerBtn} type="submit" >SIGN IN</button>
                    </form>
                </div>
                {errors.length > 0 &&
                    <Errors errors={errors} />
                }
            </div>
        )
}