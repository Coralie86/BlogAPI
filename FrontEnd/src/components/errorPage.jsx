import style from '../styles/errorPage.module.css'
import { Link} from "react-router-dom"

export default function ErrorPage() {
    return(
        <div className={style.errorContainer}>
            <h1>This page does not exists</h1>
            <Link to="/">Click here to go back to the List of Page.</Link>
        </div>
    )
}