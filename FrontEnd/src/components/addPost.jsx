
import { useNavigate, useParams } from "react-router-dom"
import style from "../styles/register.module.css"
import {AuthContext} from "./authContext.jsx"
import {useContext, useState} from "react"
import {createPost} from "../services/posts.js"
import Errors from "./errors.jsx"


export default function PostCreate() {
    const {auth, setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([]);


    const handleSubmit = async(e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            await createPost(formData, auth, setAuth);
            navigate('/app/posts');
        } catch(err) {
            setErrors(err)
        }
    }

    return (
        <div className={style.registerMainContainer}>
            <div className={style.registerContainer}>Create a New Post
                <form className={style.registerForm} method="post" onSubmit={handleSubmit} >
                    <label htmlFor="title">Title
                        <input className={style.registerInput} id="title" name="title" type="text" required />
                    </label>
                    <label htmlFor="description">Description
                        <textarea className={style.registerInput} id="description" name="description" />
                    </label>
                    <button className={style.registerBtn} type="submit" >CREATE</button>
                </form>
            </div>
            {errors.length > 0 &&
                <Errors errors={errors} />
            }
        </div>
    )

}