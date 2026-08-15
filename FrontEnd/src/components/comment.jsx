import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import style from "../styles/post.module.css";
import {fetchCommentsPost, createComment, deleteComment, updateComment} from "../services/comments.js";
import { useEffect, useState } from "react";
import Errors from "./errors.jsx"

export function Comment({comment, auth, postId, setComments}){
    const [isEditable, setIsEditable] = useState(false);
    const [errors, setErrors] = useState([]);


    const handleDeleteComment = async (e) => {
        const commentId = (e.target.getAttribute('id')).split('_')[1];
        if(!commentId){
            console.log("No element selected.")
        }
        
        try {
            await deleteComment(comment.id, auth);
            const commentPost = await fetchCommentsPost(postId);
            setComments(commentPost.postComments)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditComment = () => {
        setIsEditable(true)
    }

    const handleCancelComment = () => {
        setIsEditable(false)
    }

    const handleSaveComment = async (e) => {
        const commentId = (e.currentTarget.getAttribute('id')).split('_')[1];
        const newdescr = document.getElementById("inputCom_"+commentId).value

        try {
            const response = await updateComment(commentId, newdescr, auth);
            const commentPost = await fetchCommentsPost(postId);
            setComments(commentPost.postComments)
            setIsEditable(false)
            setErrors([])
        } catch (err) {
            setErrors(err);
        }
    }


    return(
        <div className={style.commentContainer}>
            <div className={style.comment}>
                <div className={style.authorDate}>
                    <p>{comment.author.username}</p>
                    <p>{(new Date(comment.timestamp)).toLocaleString()}</p>
                </div >
                {errors.length > 0 &&
                    <Errors errors={errors} />
                }
                {auth.isadmin ? (
                    <div className={style.editDescr}>
                        {isEditable ? (
                            <>
                                <input id={"inputCom_"+comment.id} type="text" defaultValue={comment.description} className={style.descriptionInput} />
                                <TiTickOutline id={"saveCom_"+comment.id} className={style.saveIcon} onClick={handleSaveComment}/>
                                <RxCross2 id={"cancelCom_"+comment.id} className={style.cancelIcon} onClick={handleCancelComment}/>
                            </>)
                        : (
                        <>
                            <div className={style.commentDesc}>{comment.description}</div>
                        </>)
                        }
                    </div>
                )
                : (<div className={style.commentDesc}>{comment.description}</div>) }                
            </div>
            {auth.isadmin && <div className={style.icons}>
                <GrEdit className={style.editIcon} id={"editCom_"+comment.id} onClick={handleEditComment} />
                <FaRegTrashCan className={style.deleteIcon}  id={"trash_"+comment.id} onClick={handleDeleteComment} />
            </div>
            }
            
        </div>
    )
}

export function NewComment({setComments, comments, setErrors, postId, auth}){


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await createComment(postId, formData, auth);
            const commentPost = await fetchCommentsPost(postId);
            setComments(commentPost.postComments)
        } catch(err) {
            setErrors(err)
        }
    }

    return(
        <form className={style.newComment} method="POST" onSubmit={handleSubmit} >
            <input type="text" id="description" name="description" placeholder="Insert your comment" className={style.descriptionInput} required />
            <button className={style.submitBtn} type="submit" >POST</button>
        </form>
    )
}