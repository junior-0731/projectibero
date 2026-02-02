import React from 'react'
import { useAppContext } from '../context/useAppContext'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function CardUser() {
    const {empleado,logout} = useAppContext();
    const navigate = useNavigate()
    const handleClick =()=>{

        logout();
        localStorage.clear()
        toast.success('Hasta pronto ' + empleado?.name)
        navigate('/login')
    }
  return (
    empleado &&
    <div className='flex flex-row items-center justify-end gap-2 w-300px'>
        <div className='w-8 h-8 rounded-full bg-neutral-800 flex justify-center items-center text-white'>
            <span>{empleado.name[0]}</span>
        </div>
        <div className='flex flex-col gap-1 items-start'>
            <p className='text-neutral-700 text-sm'>{empleado.name} -{empleado.userName} </p>
            <button className='text-xs text-red-400 cursor-pointer transition-all hover:text-red-500 font-semibold' onClick={handleClick}>Cerrar Sesión</button>
        </div>
      
    </div>
  )
}
