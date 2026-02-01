import { IsNotEmpty, isNotEmpty, IsString, isString, MaxLength, maxLength } from "class-validator";

export class CreateEmpleadoDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}        