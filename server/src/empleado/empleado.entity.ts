import { ContactEntity } from "src/contact/contact.entity";

// Aca se creara la estructura en ts del modelo de prisam que se ha creado
export class empleadoEntity {
  id: number;
  name: string;
  userName: string;
  password?: string;
  createdAt: Date;
  contacts?: ContactEntity[];
}
