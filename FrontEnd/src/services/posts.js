const API_URL = import.meta.env.VITE_API_URL

export async function fecthPostList(auth) {
    const response = await fetch(`${API_URL}/posts`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`,
        }
    });
    const data = await response.json();

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

export async function deletePost(postId, auth) {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })
    if(!response.ok){
        throw new Error("Failed to delete post.")
    }

    return await response.json()
}

export async function createPost(formData, auth) {
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${auth.token}`,
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })

    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }
    return data;
    
}

export async function updatePost({postId, title, description, isPublished, auth}) {
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

    console.log(JSON.stringify(body))
    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`,
        },
        body: JSON.stringify(body)
    })
    
    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data;
}