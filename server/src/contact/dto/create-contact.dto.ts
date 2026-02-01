import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    phone:string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    address:string;
}