import { IsNotEmpty, IsString } from 'class-validator';

export class PinDto {
  @IsString()
  @IsNotEmpty()
  pin: string;
}
