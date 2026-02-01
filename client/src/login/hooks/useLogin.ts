// Creacion de hook que se va encargar de usar el servicio

import { loginMethod } from "../services/auth-service"

// Tener metodo que se encargara de la autenticacion
export const useLogin = () => {
    const loginUser = async (form: { username: string; password: string }) => {
        try {
            const { data } = await loginMethod(form.username, form.password);
            console.log('loginuser', data);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            return null;
        }
    };

    return { loginUser };
};