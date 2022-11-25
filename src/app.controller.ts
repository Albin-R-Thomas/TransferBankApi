import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AccoutDto } from '../dto/account.dto';
import { TransferDto } from 'dto/transferDetails.dto';
import { ValidateDto } from 'dto/validate.dto';
import { PinDto } from 'dto/pin.dto';
@Controller('bank')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAccount(@Query('id') id: string) {
    return this.appService.getAccount(id);
  }
  @Delete('')
  deleteAccount(@Query('id') id: string, @Body() pin: PinDto) {
    return this.appService.deleteAccount(id, pin);
  }
  @Post()
  addAccount(@Body() account: AccoutDto) {
    return this.appService.addAccount(account);
  }
  @Post('/transfer')
  transferAmount(@Body() transferDetails: TransferDto) {
    return this.appService.transferAmount(transferDetails);
  }
  @Patch()
  udpateDetails(@Body() udpateDetails: ValidateDto) {
    return this.appService.updateAccount(udpateDetails);
  }
}
