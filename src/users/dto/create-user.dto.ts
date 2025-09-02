import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @MinLength(6)
    readonly password: string;

    @IsOptional() //si no lo mandan, toma el default del schema
    @IsIn(['admin', 'user', 'editor']) //solo acepta estos valores
    readonly role?: string;
}
