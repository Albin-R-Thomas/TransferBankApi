import { IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  id1: string;
  @IsString()
  pin: string;
  @IsString()
  id2: string;
  @IsString()
  amount: string;
}
