import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { AccoutDto } from '../dto/account.dto';
import { TransferDto } from 'dto/transferDetails.dto';
import { ValidateDto } from 'dto/validate.dto';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PinDto } from 'dto/pin.dto';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  toJson(data: Prisma.BatchPayload) {
    return JSON.stringify(data, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v,
    );
  }
  async getAccount(id: string) {
    try {
      const user = await this.prisma.bank.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return { msg: " User doesn't exist " };
      }
      return {
        id: user.id,
        name: user.name,
        amount: user.amount,
      };
    } catch (e) {
      return e;
    }
  }
  async deleteAccount(id: string, password: PinDto) {
    try {
      const isUser = await this.prisma.bank.findUnique({
        where: {
          id,
        },
      });
      if (!(await bcrypt.compare(password.pin, isUser.pin))) {
        return 'Invalid Credentials';
      }
      if (!isUser) {
        return 'user not found';
      }
      const user = await this.prisma.bank.deleteMany({
        where: {
          id,
        },
      });
      return this.toJson(user);
    } catch (e) {
      return e;
    }
  }
  async addAccount(account: AccoutDto) {
    try {
      const hashedPassword = await bcrypt.hash(account.pin, 10);
      const user = await this.prisma.bank.create({
        data: {
          name: account.name,
          pin: hashedPassword,
          email: account.email,
          phoneNumber: account.number,
          amount: account.amount,
        },
      });

      return {
        id: user.id,
        name: user.name,
        amount: user.amount,
      };
    } catch (e) {
      return e;
    }
  }
  async transferAmount(transferDetails: TransferDto) {
    try {
      const id1 = transferDetails.id1;
      const id2 = transferDetails.id2;
      const pin = transferDetails.pin;
      const user1 = await this.prisma.bank.findUnique({
        where: {
          id: id1,
        },
      });
      const user2 = await this.prisma.bank.findUnique({
        where: {
          id: id2,
        },
      });
      if (!user1 || !user2) {
        return { msg: "user doesn't exist " };
      } else if (!(await bcrypt.compare(pin, user1.pin))) {
        return { msg: 'invalid credentials' };
      } else if (user1.id === user2.id) {
        let newAmount = BigInt(user1.amount);
        newAmount = newAmount + BigInt(transferDetails.amount);
        await this.prisma.bank.update({
          where: {
            id: id1,
          },
          data: {
            amount: newAmount.toString(),
          },
        });
        return {
          msg: `Successfully transferred ${transferDetails.amount} to your Account `,
        };
      }
      if (BigInt(user1.amount) - BigInt(transferDetails.amount) < 0) {
        return { msg: 'invalid credentials' };
      }
      let newAmount1 = BigInt(user1.amount);
      newAmount1 -= BigInt(transferDetails.amount);
      let newAmount2 = BigInt(user2.amount);
      newAmount2 += BigInt(transferDetails.amount);
      await this.prisma.bank.update({
        where: {
          id: id1,
        },
        data: {
          amount: newAmount1.toString(),
        },
      });
      const updatedUser2 = await this.prisma.bank.update({
        where: {
          id: user2.id,
        },
        data: {
          amount: newAmount2.toString(),
        },
      });
      return {
        msg: `Successfully transferred ₹${transferDetails.amount} to ${updatedUser2.id} `,
      };
    } catch (e) {
      return e;
    }
  }
  async updateAccount(updatedDetails: ValidateDto) {
    try {
      const id = updatedDetails.id;
      const pin = updatedDetails.pin;
      const user = await this.prisma.bank.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return { msg: " User doesn't exist " };
      }
      if (await bcrypt.compare(pin, user.pin)) {
        return { msg: ' Invalid credentials' };
      }
      const hashedNewPin = await bcrypt.hash(pin, 10);
      const updatedUser = {
        name: updatedDetails.name ? updatedDetails.name : user.name,
        pin: updatedDetails.newPin ? hashedNewPin : user.id,
        email: updatedDetails.email ? updatedDetails.email : user.email,
        phoneNumber: updatedDetails.number
          ? updatedDetails.number
          : user.phoneNumber,
        amount: updatedDetails.amount
          ? updatedDetails.amount
          : user.amount.toString(),
      };
      const newUser = await this.prisma.bank.update({
        where: {
          id,
        },
        data: updatedUser,
      });
      return {
        id: newUser.id,
        name: newUser.name,
        amount: newUser.amount.toString(),
      };
    } catch (e) {
      return e;
    }
  }
}
