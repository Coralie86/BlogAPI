import {useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import style from "../styles/post.module.css"
import {AuthContext} from "./authContext.jsx"
import {useContext} from "react"
import { Link} from "react-router-dom"
import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { TiTickOutline } from "react-icons/ti";
import {fetchPost, deletePost, updatePost} from "../services/posts.js";
import PostCreate from "./addPost.jsx"
import {Comment, NewComment} from "./comment.jsx"
import { fetchCommentsPost } from "../services/comments.js"
import Errors from "./errors.jsx"

export default function Post() {
    const {postId} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isEditablePost, setIsEditablePost] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [errors, setErrors] = useState([]);

   
    useEffect(() => {
        const controller = new AbortController();

        async function loadData() {
            try {
                const post = await fetchPost(postId);
                setPost(post);
                setIsPublished(post.ispublished)

                const commentPost = await fetchCommentsPost(postId);
                setComments(commentPost.postComments)
            } catch(err) {
                console.log(err);
            }
        }
        loadData()

        return () => {
            controller.abort();
        }
    }, [isEditablePost])



    const handleEditPost = async() => {
        setIsEditablePost(true);
    }

    const handleDeletePost = async() => {
        try {
            await deletePost(postId, auth, setAuth);
            navigate('/posts')
        } catch (err) {
            console.log(err)
        }
    }

    const handleSavePost = async() => {
        const newTitle = document.getElementById('title').value;
        const newDescription = document.getElementById('description').value;

        try {
            await updatePost({postId: postId, title: newTitle, description: newDescription, auth: auth, setAuth:setAuth})
            setIsEditablePost(false)
            setErrors([])
        } catch(err) {
            setErrors(err)
        }
    }

    const handlePublished = async() => {
        try {
            const response = await updatePost({postId: postId, isPublished: !isPublished, auth: auth, setAuth:setAuth})
            setIsPublished(response.post.ispublished)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <div className={style.page}>
                {errors.length > 0 &&
                    <Errors errors={errors} />
                }
                {auth.isadmin && (<div className={style.postBtns} >
                    <button id="published" className={isPublished ? style.unpublish : style.publish} onClick={handlePublished} >{isPublished ? "Unpublish" : "Publish"}</button>
                    {!isEditablePost ? (<GrEdit className={style.editIcon} onClick={handleEditPost} />)
                    : (<TiTickOutline className={style.saveIcon} onClick={handleSavePost}/>)
                    }
                    <FaRegTrashCan className={style.deleteIcon}  onClick={handleDeletePost} />
                                </div>)
                }                
                <div className={style.postInfo}>
                    <div  className={style.titleDescPost}>
                        {isEditablePost ? (
                            <input className={style.descriptionInput} id="title" name="title" type="text" defaultValue={post.title} required />
                        )
                        : (<h1>{post.title}</h1>) }
                        
                        <div className={style.datePost}>{(new Date(post.date)).toLocaleString()}</div>
                    </div>
                    {isEditablePost ? (
                        <textarea className={style.textArea} id="description" defaultValue={post.description} required />
                    )
                        : ( <div className={style.descrPost}>{post.description}</div> ) 
                    }
                                      
                </div>
                <div className={style.comments} >COMMENTS ({comments.length})
                    
                    <div className={style.commentList}>
                        { comments.length > 0 && comments.map(comment => {
                            return (
                            <Comment key={comment.id} comment={comment} auth={auth} postId={postId} setComments={setComments} setAuth={setAuth} />
                            )
                        })}
                    </div>
                    {auth.token ? ( <NewComment setComments={setComments} comments={comments} setErrors={setErrors} postId={postId} auth={auth} setAuth={setAuth} />)
                    : (<Link className={style.loginLink}  to='/login' >Please <b>Login</b> to comment</Link>)
                    }                  
                </div>
            </div>
        </>
    )

}


