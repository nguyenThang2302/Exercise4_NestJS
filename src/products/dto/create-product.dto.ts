import { IsString } from 'class-validator';

export class CreateProductDto {

    @IsString()
    name: string;

    @IsString()
    author: string;

    @IsString()
    description: string;
}
