import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { promises } from 'dns';
import { PrismaService } from 'src/database/prisma.service';
import { ContactEntity } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { error } from 'console';
import { concat } from 'rxjs';

@Injectable()
export class ContactService {
    constructor(private readonly prisma:PrismaService){}
    // Una promesa que retorna un array de contactEntity o undefined
    async getAllContactByUser(empleadoId:number):Promise<ContactEntity[] | undefined>{
        try {
            // Obtenemos todos los contactos donde el userId sea ese
            const contacts = await this.prisma.contact.findMany({
               where:{
                empleadoId,
               } 
            });
            return contacts;
        } catch (error) {
            if(error instanceof Error){
                throw new InternalServerErrorException(error.message)
            }
        }

    }
    async getContactById(contactId:number):Promise<ContactEntity| undefined>{
        try {
            const contact = await this.prisma.contact.findUnique({
                where:{
                    id: contactId,
                }
            })
            if(!contact) throw new NotFoundException('Contact notf found')
            return contact
            
        } catch (error) {
            if(error instanceof NotFoundException){
                throw new NotFoundException(error.message)
            }
            if(error instanceof Error){
                throw new InternalServerErrorException(error.message)
            }
            
        }
    }
    // Crear el contacto y pasar el id del empleado al que quedara vinculado
    async createContact(empleadoId:number, body:CreateContactDto):Promise<ContactEntity | undefined>{
        try {
            const newContact = await this.prisma.contact.create({
              data:{
                name:body.name,
                lastName:body.lastName,
                email:body.email,
                phone: body.phone,
                address: body.address,
                empleadoId
              }
            })
            return newContact

            
        } catch (error) {
            if(error instanceof Error){
                throw new InternalServerErrorException(error.message)
            }
            
        }
    }
    async updateContact(contactId:number, body:CreateContactDto): Promise<ContactEntity | undefined>{
        try {
            const contact = await this.prisma.contact.findUnique({
                where:{
                    id:contactId
                }
            })
            if(!contact) throw new NotFoundException('Contact not found');
            const updateContact = await this.prisma.contact.update({
                where:{
                    id: contactId

                },
                data:{
                    name:body.name,
                    lastName: body.lastName,
                    email: body.email,
                    address: body.address
                }
            })
            return updateContact
            
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException(error.message)
            if(error instanceof Error){
                throw new InternalServerErrorException(error.message)
            }
        }
    }
    async deleteContact (contactId:number):Promise<ContactEntity | undefined>{
        try {
            const contact = await this.prisma.contact.findUnique({
                where:{
                    id:contactId
                }
            })
            if(!contact) throw new NotFoundException('Contact not found');
            const deleteConcat = await this.prisma.contact.delete({
                where:{
                    id:contactId
                },
            });
            return deleteConcat;
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException(error.message)
            if(error instanceof Error) throw new InternalServerErrorException(error.message)
            
        }

    }
}
