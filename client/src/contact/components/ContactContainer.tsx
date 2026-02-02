// Se usara en el add contact
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "@/components/ui/dialog"
import { useContact } from '../hooks/UserContact'
import CardContact from './CardContact'
import ContactForm from "./ContactForm"
import type { ICreateContact } from "../services/contact-service"
import React, { useMemo, useState } from "react"
import { FileKey, Filter } from "lucide-react"

export default function ContactContainer() {
    const [filter, setFilter] = useState<string>("");

    const {contacts,generateContact, modifyContact,removeContact} = useContact()
    const filterContacts = useMemo(()=>{

        if(filter.trim())
        return contacts.filter(el=>el.name.toLowerCase().includes(filter.toLowerCase())  || 
        el.lastName.toLowerCase().includes(filter.toLowerCase()) || 
        el.phone.toLowerCase().includes(filter.toLowerCase()) || 
        el.email.toLowerCase().includes(filter.toLowerCase()))
        return contacts
    },[filter, contacts])

    const handleSaveData =(isEditing:boolean, id:number, body: ICreateContact)=>{
        // Recibe lo que se esta estableciendo
        if(!isEditing){
            generateContact(body); 
        }else{
            modifyContact(body,id);
        }
    }
    if(contacts.length === 0){
        return <p>No se encontraron datos</p>
    }
    else{
         return (
            <section className='w-full flex flex-col gap-10 justify-center items-center mt-4'>
                <input type="text" placeholder='Buscar...' className='p-2 text-sm outline-none border rounded-full border-gray-200 w-[90%] hover:border-2 hover:border-sky-500 transition-all' 
                value={filter}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setFilter(e.target.value)}
                />
                <div className="w-90% flex flex-row flex-wrap gap-2 border-2 border-gray-200 p-5">
                        {filterContacts.map((el, index)=>(
                            <CardContact key={index} contact={el} save={handleSaveData}
                            deleteContact={removeContact}/>
                        ))}
                </div>

                <Dialog>
                    <DialogTrigger className='font-semibold text-sky-600 uppercase underline text-sm cursor-pointer'>Add contact</DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                        <DialogTitle>Crear Nuevo contacto</DialogTitle>
                        <DialogDescription>
                            Aqui puedes crear un nuevo contacto 
                        </DialogDescription>
                        </DialogHeader>
                        <ContactForm isEditing={false} initialState={{
                            name : "",
                            lastName : "",
                            address : "",
                            email : "",
                            phone : ""
                        }}
                        save={handleSaveData}/>
                    </DialogContent>
                </Dialog>
            </section>
    )
    }
 
}
