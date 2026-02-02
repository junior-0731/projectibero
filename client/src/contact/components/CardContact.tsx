import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { IContactEntity } from '../hooks/UserContact'
import { DialogHeader } from '@/components/ui/dialog'
import ContactForm from './ContactForm'
import type { ICreateContact } from '../services/contact-service'
import { useState } from 'react'
type Props ={
    contact: IContactEntity;
    save: (isEditing: boolean, id: number, body: ICreateContact) => void;
    deleteContact: (id:number)=>void
}
export default function CardContact({contact, save,deleteContact}:Props) {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  return (
    <div className='flex flex-col w-[350px] p-2 gap-2 border-gray-200 rounded-md border-2'>
      <h3 className='text-sm font-semibold text-neutral-800 p-2 border-b border-gray-200'>{contact.name} {contact.lastName}</h3>
      <p className='text-xs font-semibold text-gray-500'>{contact.email} {contact.phone}</p>
      <p className='text-xs font-semibold text-gray-500'>{contact.address}</p>  
        <div className="flex w-full justify-end items-center gap-2">

            <Dialog open ={openEditModal} onOpenChange={setOpenEditModal}>
                <DialogTrigger className='text-xs font-semibold bg-amber-300 p-2 rounded-md cursor-pointer hover:opacity-74'>Editar</DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                    <DialogTitle>Actualizar contacto</DialogTitle>
                    <DialogDescription>
                        Aqui puedes actualizar un nuevo contacto 
                    </DialogDescription>
                    </DialogHeader>
                    <ContactForm isEditing={true} initialState={{
                        name : contact.name,
                        lastName : contact.lastName,
                        address : contact.address,
                        email : contact.email,
                        phone : contact.phone
                    }}
                    id={contact.id}
                    save={save}
                    onClose={()=>setOpenEditModal(!openEditModal)}/>
                </DialogContent>
            </Dialog>

            <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className='text-xs font-semibold bg-red-300 p-2 rounded-md cursor-pointer hover:opacity-74'>Eliminar</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Seguro que quieres eliminar este contacto?</AlertDialogTitle>
                <AlertDialogDescription>
                   Esta acción es irrevesinble 
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Conservar</AlertDialogCancel>
                <AlertDialogAction  onClick={()=>deleteContact(contact.id)}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  )
}
