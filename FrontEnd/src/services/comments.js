const API_URL = import.meta.env.VITE_API_URL
import { authFetch } from "./auth"

export async function fetchCommentsPost(postId) {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    if(!response.ok){
        throw new Error("Failed in fetching comments.")
    }
    return await response.json()
}

export async function createComment(postId, formData, auth, setAuth) {
    const response = await authFetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    }, auth, setAuth)
    
    const data = await response.json();
    
    if(!response.ok){
        throw data.errors;
    }
    return data
}

export async function deleteComment(commentId, auth, setAuth) {
    const response = await authFetch(`${API_URL}/comments/${commentId}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
        }
    }, auth, setAuth)

    if(!response.ok){
        throw new Error("Failed in delete comment.")
    }
    return await response.json()
    
}

export async function updateComment(commentId, newComment, auth, setAuth) {
    const response = await authFetch(`${API_URL}/comments/${commentId}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            description: newComment
        })
    }, auth, setAuth)    

    if(!response.ok){
        throw data.errors;
    }
    const data = await response.json();

    return data
}