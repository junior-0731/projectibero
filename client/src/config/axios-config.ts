// Aqui crearemos una pequeña configutracion de axios que no spermite realizar la conexión usando esa variable de entorno de manera global para usar las instancias en controladores o servicios
import axios from "axios"  // Importamos axios


// Creamos un objeto donde podemos pasar cabeceras donde se usa, el tiempo de espera y un baseUrl
export const apiClient = axios.create({
    timeout:3000,
    baseURL: import.meta.env.VITE_API_BACKEND,
    headers:{
        "Content-Type": "application/json",
    },

});