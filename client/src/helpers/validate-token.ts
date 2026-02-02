import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token:string)=>{
    // Se decodifica el token
    const decoded = jwtDecode(token)
    // Obtener el tiempo actual
    const currentTime = new Date()
    // Validar si la decodificación contiene la fecha de expiracion y convertimos para que quede un formato que sea igual a currentTime
    if(decoded.exp){
        // De esta manera esta validado
        const exp = new Date(decoded.exp *1000)
        if(currentTime >= exp){
            return true;
        }else{
           return false;
        }
    }
    return true;
}
