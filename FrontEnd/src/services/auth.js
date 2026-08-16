const API_URL = import.meta.env.VITE_API_URL

export async function fecthUserLogged(auth, setAuth) {
    try {
        const response = await authFetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }, auth, setAuth)

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

export const authFetch = async (url, options = {}, auth, setAuth) =>{
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${auth.token}`,
    }
    
    const response = await fetch(url, {
        ...options,
        headers: headers,
    })

    if(response.status === 401){
        localStorage.removeItem("token");
        setAuth({token: null, isadmin: false})
        logout();
        window.location.reload();
    }

    return response

}