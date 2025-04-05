export const loginUser = async (password, username) => {

    try{
        const response = await fetch ('http://127.0.0.1:8000/task_manager/token/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({ username, password})
            
        })

        const data = await response.json();
        
        const token =data.access;
        
        if(response.ok){
            localStorage.setItem('authToken', token);
            return token;
        }else{
            throw new Error (data.message || 'Authentication Failed');
        }
    }catch (error){
        console.log('login Error',error);
        throw error;
    }
}

export const getToken = () => {

    return localStorage.getItem('authToken');
}