import style from '../styles/errors.module.css'

export default function Errors({errors}) {
    return (
        <ul className={style.error}>Inputs errors:
            {errors.map((err) => {
                return( <li key={errors.indexOf(err)} >{err.msg}</li>)
            })}
        </ul>
    )
}