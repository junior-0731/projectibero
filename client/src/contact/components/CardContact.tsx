import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import ContactForm from "./ContactForm";
import {  type ICreateContact } from "../services/contact-service";
import { useState } from "react";
import type { IContactEntity } from "../hooks/UserContact";

type Props = {
  contact: IContactEntity;
  save: (isEditing: boolean, id: number, body: ICreateContact) => void;
  deleteContact: (id: number) => void;
};
export default function CardContact({ contact, save, deleteContact }: Props) {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-[350px] p-2 gap-2 border border-gray-200 rounded-md">
      <h3 className="text-sm font-semibold text-neutral-800 p-2 border-b border-gray-200">
        {contact.name} {contact.lastName}
      </h3>
      <p className="text-xs font-semibold text-gray-500">
        {contact.email} - {contact.phone}
      </p>
      <p className="text-xs font-semibold text-gray-500">{contact.address}</p>
    
      <div className="flex w-full justify-end items-center gap-2">
        <Dialog
          open={openEditModal}
          onOpenChange={() => setOpenEditModal(!openEditModal)}
        >
          <DialogTrigger className="text-xs font-semibold bg-amber-200 p-2 rounded-md cursor-pointer hover:opacity-75">
            Editar
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar contacto</DialogTitle>
              <DialogDescription>
                 Aqui puedes actualizar un nuevo contacto 
              </DialogDescription>
            </DialogHeader>
            <ContactForm
              isEditing={true}
              initialState={{
                name: contact.name,
                lastName: contact.lastName,
                phone: contact.phone,
                address: contact.address,
                email: contact.email,
              }}
              id={contact.id}
              save={save}
              onClose={() => setOpenEditModal(!openEditModal)}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger className="text-xs font-semibold bg-red-200 p-2 rounded-md cursor-pointer hover:opacity-75">
            Eliminar
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Deseas eliminar este contacto?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Si quieres continuar solo presiona el botón y tu contacto se
                eliminará de la base de datos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={()=>deleteContact(contact.id)}>Continar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}