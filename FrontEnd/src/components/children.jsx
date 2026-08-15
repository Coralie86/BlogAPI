import { Link, Outlet, useParams} from "react-router-dom"
import Register from "./register.jsx"
import Login from "./login.jsx"
import Listpost from "./listpost.jsx"
import ErrorPage from "./errorPage.jsx"
import PostCreate from "./addPost.jsx"

export default function Children() {
    const {page} = useParams()

    return (
        <>
            {page === "register" ? (<Register />)
            : page === "login" ? (<Login />)
            : page === "posts" ? (<Listpost />)
            : page === "new" ? (<PostCreate />)
            : page === "undefined" ? (<Listpost />)
            : (<ErrorPage />)}
        </>
    )
}