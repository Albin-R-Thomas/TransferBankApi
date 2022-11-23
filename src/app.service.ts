import { Injectable } from '@nestjs/common';
import { AccoutDto } from '../dto/account.dto';
import {
  addAccount,
  deleteAccount,
  getAccount,
  transferAmount,
  updateAccount,
} from '../assets/constant';
import { TransferDto } from 'dto/transferDetails.dto';
import { ValidateDto } from 'dto/validate.dto';
@Injectable()
export class AppService {
  getAccount(id: number) {
    return getAccount(id);
  }
  deleteAccount(id: number) {
    return deleteAccount(id);
  }
  addAccount(account: AccoutDto) {
    return addAccount(account);
  }
  transferAmount(transferDetails: TransferDto) {
    return transferAmount(transferDetails);
  }
  updateAccount(updateDetails: ValidateDto) {
    return updateAccount(updateDetails);
  }
}
