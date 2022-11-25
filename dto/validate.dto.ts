import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ValidateDto {
  id: string;
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  pin: string;
  @IsString()
  @MinLength(4)
  @IsOptional()
  newPin?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsNumber()
  @IsOptional()
  number?: number;
  @IsString()
  @IsOptional()
  amount?: string;
}
