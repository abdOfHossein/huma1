import {
  Body,
  Controller,
  Get,
  Post,
  OnModuleInit,
  Inject,
  Param,
  Res,
  Put,
  Delete,
} from '@nestjs/common';

import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.option';
import { IGrpcService } from './grpc.interface';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

interface IUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: number;
}
interface IUsers{
  data:Array<IUserInfo>
}

@Controller('user')
export class UserController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('UserController');
  }

  //read all user
  @Get('show/all')
  async findAll(): Promise<IUsers | object> {
    try {
      const result = this.grpcService.findAll({});
      console.log(`result in api-gateway findAll===>${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }

  //read one user
  @Get('show/:id')
  async findOne(@Param('id') id: string) {
    try {
      const Id = Number(id);
      const result = this.grpcService.findOne({ id: Id });
      console.log(`result of Get Req in api-gateway service:${result}`);
      return result;
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }
  //creat user
  @Post('creat')
  async addUser(@Body() userInfo: any) {
    try {
      const { firstName, lastName, phoneNumber } = userInfo;
      return this.grpcService.addUser({ firstName, lastName, phoneNumber });
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }

  //update user
  @Put('update/:id')
  async updateUser(@Body() info: any, @Param('id') id: string) {
    try {
      const { firstName, lastName, phoneNumber } = info;
      const Id = Number(id);
      console.log(`Id===>${Id}`);

      console.log(
        `updated info${JSON.stringify({
          id: Id,
          info: { firstName, lastName, phoneNumber },
        })}`,
      );
      return this.grpcService.updateUser({
        id: Id,
        info: { firstName, lastName, phoneNumber },
      });
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }

  //delete user
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      const Id = Number(id);

      console.log(`delete Id${Id}`);
      return this.grpcService.deleteUser({ id: Id });
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }
}
