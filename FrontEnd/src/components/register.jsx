import { useNavigate } from "react-router-dom"
import style from "../styles/register.module.css"
import { useState } from "react";
import Errors from "./errors.jsx";
import {register} from "../services/auth.js"

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try { 
            await register(formData);
            navigate('/app/posts')           
        } catch(err) {
            setErrors(err)
        }
    }

    return (
        <div className={style.registerMainContainer}>
            <div className={style.registerContainer}>Create Account
                <form className={style.registerForm} method="post" onSubmit={handleSubmit} >
                    <label htmlFor="username">Username
                        <input className={style.registerInput} id="username" name="username" placeholder="Insert a username" type="text" required />
                    </label>
                    <label htmlFor="email">Email
                        <input className={style.registerInput} id="email" name="email" placeholder="Insert an email" type="email" required />
                    </label>
                    <label htmlFor="password">Password
                        <input className={style.registerInput} id="password" name="password" placeholder="Insert an password" type="password" required />
                    </label>
                    <label htmlFor="confirmPassword">Confirm Password
                        <input className={style.registerInput} id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" type="password" required />
                    </label>
                    <button className={style.registerBtn} type="submit" >REGISTER</button>
                </form>
            </div>
            {errors.length > 0 &&
                <Errors errors={errors} />
            }
        </div>
    )
}