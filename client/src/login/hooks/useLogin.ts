import { toast } from 'react-hot-toast';
// Creacion de hook que se va encargar de usar el servicio
import { loginMethod } from "../services/auth-service"
import { useNavigate } from "react-router";
import { useAppContext } from '../../context/useAppContext';
// Tener metodo que se encargara de la autenticacion
export const useLogin = () => {
    const navigate = useNavigate()
    // Estraer el login
    const {login} = useAppContext()
    const loginUser = async (form: { username: string; password: string }) => {
        try {
            const { data } = await loginMethod(form.username, form.password);
            // se pasa al estado general, para alamcenar los valores del estado
            login(data.empleado, data.access_token);
            localStorage.setItem("token", JSON.stringify(data.access_token));
            localStorage.setItem("empleado", JSON.stringify(data.empleado));
            toast.success("Bienvenido");
            navigate("/")
            return data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            return null;
        }
    };

    return { loginUser };
};