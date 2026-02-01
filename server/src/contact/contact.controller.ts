import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { IRequestAuth } from 'src/auth/request-auth';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService:ContactService){}
    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll (@Req() req:IRequestAuth){
        const empleadoId = (req as any).user?.empleadoId;
        if (!empleadoId || typeof empleadoId !== 'number') {
            throw new (require('@nestjs/common').UnauthorizedException)('Usuario no autenticado');
        }
        console.log('EmpleadoId:', empleadoId);
        return await this.contactService.getAllContactByUser(empleadoId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOne(@Param('id' , ParseIntPipe) id :number){
        return await this.contactService.getContactById(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post("/")
    async create(@Req() req:IRequestAuth, @Body() body:CreateContactDto){
        const empleadoId = (req as any).user?.empleadoId;
        if (!empleadoId || typeof empleadoId !== 'number') {
            throw new (require('@nestjs/common').UnauthorizedException)('Usuario no autenticado');
        }
        return await this.contactService.createContact(empleadoId, body)
    }

    // Creación de controladores
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    // Recibe params que tendra esa nomencaltura y segundo el body
    async editContact(@Param('id', ParseIntPipe) id:number, @Body() body:CreateContactDto){
        return await this.contactService.updateContact(id, body);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteConcat(@Param('id', ParseIntPipe) id:number){
        return await this.contactService.deleteContact(id)
    }


}
