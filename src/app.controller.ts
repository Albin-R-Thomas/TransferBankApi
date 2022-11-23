import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AccoutDto } from '../dto/account.dto';
import { TransferDto } from 'dto/transferDetails.dto';
import { ValidateDto } from 'dto/validate.dto';

@Controller('bank')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getAccount(@Param('id') id: number) {
    return this.appService.getAccount(id);
  }
  @Delete(':id')
  deleteAccount(@Param('id') id: number) {
    return this.appService.deleteAccount(id);
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
