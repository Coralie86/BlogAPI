const API_URL = import.meta.env.VITE_API_URL

export async function fecthUserLogged(auth) {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`,
            }
        })

        if(!response.ok){
            throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json();
        return data
    } catch(err) {
        console.log(err);
    }
    
}


export async function register(formData) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
    })

    const data = await response.json();

    if(!response.ok){
        throw data.errors
    }
        
    return data
    
}


export async function login(formData) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    const data = await response.json();

    if(!response.ok){
        throw data.errors
    }
        
    return data
    
}


export async function logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
            })

    const data = await response.json();

    if(!response.ok){
        throw data.errors
    }
        
    return data
    
}