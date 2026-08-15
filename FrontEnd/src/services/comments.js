const API_URL = import.meta.env.VITE_API_URL

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

export async function createComment(postId, formData, auth) {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`,
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
    
    const data = await response.json();
    console.log(data)
    if(!response.ok){
        throw data.errors;
    }
    return data
}

export async function deleteComment(commentId, auth) {
    const response = await fetch(`${API_URL}/comments/${commentId}`,{
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            })
    if(!response.ok){
        throw new Error("Failed in delete comment.")
    }
    return await response.json()
    
}

export async function updateComment(commentId, newComment, auth) {
    const response = await fetch(`${API_URL}/comments/${commentId}`,{
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    description: newComment
                })
            })
    
    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data
}