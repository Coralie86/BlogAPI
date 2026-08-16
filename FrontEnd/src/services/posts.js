const API_URL = import.meta.env.VITE_API_URL
import { authFetch } from "../services/auth.js"
import { logout } from "../services/auth.js";

export async function fecthPostList(auth, setAuth) {
    let response = await authFetch(`${API_URL}/posts`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }, auth, setAuth);
    
    let data = await response.json()
    
    if(data.connected === false){
        localStorage.removeItem("token");
        logout();
        setAuth({token: null, isadmin: false});
    }

    if(!response.ok){
        throw new Error("server error");
    }
    return data;
}


 export async function fetchPost(postId) {
    const res = await fetch(`${API_URL}/posts/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch posts.")
    }
    return await res.json();    
}

export async function deletePost(postId, auth, setAuth) {
    const response = await authFetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }, auth, setAuth)

    if(!response.ok){
        throw new Error("Failed to delete post.")
    }

    return await response.json()
}

export async function createPost(formData, auth, setAuth) {
    const response = await authFetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    }, auth, setAuth)

    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }
    return data;
    
}

export async function updatePost({postId, title, description, isPublished, auth, setAuth}) {
    const body = {};

    if(title !== undefined) {
        body.title = title;
    }

    if(description !== undefined) {
        body.description = description;
    }

    if(isPublished !== undefined) {
        body.isPublished = isPublished;
    }

    const response = await authFetch(`${API_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }, auth, setAuth)
    
    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data;
}