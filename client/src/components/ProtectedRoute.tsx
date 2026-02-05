// Componente dedicado a la configuración y protección de las rutas

import type React from "react"
import { useEffect, useState } from "react"
import { useAppContext } from "../context/useAppContext";
import { isTokenExpired } from "../helpers/validate-token";
import { Navigate } from "react-router";


// Crear las props que se va a recibir es una prop children
type props ={
    children: React.ReactNode
}

// Aca se pasan las props
export default function ProtectedRoute({children}: props) {

    // Iniciamos a crear todo lo relacionado con el componente
    // Crear variable de estado inicializada en false
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // Lo mismo con la variable de loading
    const [loading, setLoading] = useState<boolean>(true);

    // importar el estadop global AppContext y traer el login y logout

    const {login, logout} = useAppContext();
     // Hacer uso de un ciclo de vida useEffect que eestara al tanto de el cambio de nada [], ya que es en la carga del componente

     useEffect(()=>{
        // esta función es para obtenrer la autenticacion, validar si los tokens han expirado o no, para asignar un valor o no asignarlo al estado global
        async function getAuth() {
            const token  = localStorage.getItem("token") as string
            const empleadoAuth  = localStorage.getItem("empleado") as string

            // iniciar con validaciones
            if(token && empleadoAuth){
                // Validar si esto retorna true o false
                if(isTokenExpired(token)){
                    // Se debe de hacer un logpout para que se borre toda la data y eliminar todos los datos del localStorage
                    logout();
                    // Metodo para borrar todo
                    localStorage.clear();
                    // Cambiar el Authenticated a false porq ya no estamos autenticados
                    setIsAuthenticated(false);
                    return;
                }
                else{
                    // Pasar authenticated a true es decir aue ha sido exitosa
                    setIsAuthenticated(true);
                    // pasamos el login
                    login(JSON.parse(empleadoAuth), JSON.parse(token));
                }

            }
            // en caso de que no entre en la condicion anterior, se coloca todo en false y desautenticarnos

            else{
                  logout();
                    // Metodo para borrar todo
                    localStorage.clear();
                    // Cambiar el Authenticated a false porq ya no estamos autenticados
                    setIsAuthenticated(false);
            }
            // cmabiar el valor a setLoadingf
            setLoading(false)
        }
        getAuth();

     },[]);

     if(loading){
        return null
     }

    // si esta autenticado permite acceder a los componentes hijos, de lo contrario redirije al login
    return isAuthenticated? children: <Navigate to="/login"/>
  
}
