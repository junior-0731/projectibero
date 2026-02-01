// Implementaremos una interfaz llamada IRequestAuth
import { Request } from "express";  // importar Requrest de express

// Heredara desde Request
export interface IRequestAuth extends Request{
    empleado:{
        empleadoId : number,
        userName : string
    }

}