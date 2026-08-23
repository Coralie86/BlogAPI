import { useEffect, useState, useContext } from "react"
import { Link, Outlet} from "react-router-dom"
import style from "../styles/listpost.module.css"
import {AuthContext} from "./authContext.jsx"
import {fecthPostList} from "../services/posts.js"
import { logout } from "../services/auth.js"

export default function Listpost() {
    const [posts, setPosts] = useState([]);
    const {auth, setAuth} = useContext(AuthContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPosts() {
            try {
                let response = await fecthPostList(auth, setAuth);

                setPosts(response.postsList.map(post => ({
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    date: (new Date(post.date)).toLocaleString(),
                    ispublished: post.ispublished,
                }))
                );
                
            } catch(err){
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchPosts();

        return () => {
            controller.abort();
        }

    }, [])

    return (
        <>
            <div className={style.page}>
                <h1>Welcome to my Blog!</h1>
                <h2> Here are few posts that I would like to share with you.</h2>
                <h2>Feel free to <b>Register</b> to share your thoughts on these topics.</h2>
                {auth.isadmin && (
                    <Link className={style.addPost} to="/app/new" >+ ADD POST</Link>
                )}
                {loading && (
                    <p className={style.loading}>Loading List...</p>
                )}
                <div className={style.postList} >
                    {posts.map(post => {
                        return (
                        <PostCard key={post.id} post={post}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

function PostCard({post}) {
    return(
        <div className={style.postCard} >           
            <div className={style.postInfo}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
            </div>
            <div className={style.date}>
                <p>{post.date}</p>
            </div>
            <div className={style.readMore} >
                <Link className={style.readMore} to={`/app/posts/${post.id}`} >Read more</Link>
             </div>
        </div>
    )
}