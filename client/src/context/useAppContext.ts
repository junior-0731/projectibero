// Aqui tenemos que empezar a crear toda la estructura de nuestro contexto
// Importar desde zustand el metodo create
import { create } from "zustand";

//Crear interfaz IUser Endpoint inicio de sesión
interface IEmpleado{
    id:number
    name:string
    userName:string,
    email:string,
    createdAt:string
}
// Crear el tipo del store que estaremos trabajando

type store={
    empleado: IEmpleado | null
    token:string
    login: (empleado:IEmpleado | null, token:string)=>void
    logout: ()=>void
}
export const useAppContext = create<store>((set)=>({
    empleado: null,
    token: "",
    login: (empleado,token)=> set({empleado,token}),
    logout: ()=> set({empleado:null, token:""})
}))



