import { apiClient } from "../../config/axios-config";

export interface IRegisterBody{
    name: string
    userName: string
    password: string
}

export const loginMethod = async (userName: string, password: string) => 
    await apiClient.post("/auth/login", { userName, password });

export const registerMethod = async (body: IRegisterBody) =>
    await apiClient.post("/auth/register", body);