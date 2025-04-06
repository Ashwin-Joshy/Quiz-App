import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    image: string;

    @IsString()
    name: string;
}
