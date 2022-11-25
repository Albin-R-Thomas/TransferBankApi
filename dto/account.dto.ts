import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class AccoutDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  pin: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  @IsNotEmpty()
  number: number;
  @IsString()
  @IsNotEmpty()
  amount: string;
}
