import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ||"http://localhost:8000/api",
    headers:{
        "Content-Type":"application/json",
    },
});

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        if(token){config.headers.Authorization = `Bearer ${token}`}
        return config
    },(error)=>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response)=>{
        return response
    },(error)=>{
        if(error.response?.status ===401){
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/auth/login"
        }
        return Promise.reject(error)
    }
)

export default api