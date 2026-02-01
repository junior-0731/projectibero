import { empleadoEntity } from "src/empleado/empleado.entity"

export class ContactEntity {
    id:number;
    name:string;
    lastName:string;
    email:string;
    phone:string;
    address:string;
    empleadoId?:number;
    empleado?:empleadoEntity;
    createdAt?:Date;
}