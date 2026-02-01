// Usar metodo apiClient
import { apiClient } from "../../config/axios-config";

// Crear metodo de login

export const loginMethod = async(userName: string, password:string)=>{
    return await apiClient.post('/auth/login', {userName,password})
}