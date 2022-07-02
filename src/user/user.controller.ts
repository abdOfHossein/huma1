import {
  Body,
  Controller,
  Get,
  Post,
  OnModuleInit,
  Inject,
  Param,
} from '@nestjs/common';

import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.option';
import { IGrpcService } from './grpc.interface';
import { Logger } from '@nestjs/common';

interface IUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

@Controller('user')
export class UserController implements OnModuleInit {


  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('UserController');
  }

  @Get(':id')
  async findOne(@Param() id: number) {
    try {
      console.log(id);

      return this.grpcService.findOne({ id });
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }

  @Post('creat')
  async addUser(@Body() userInfo: IUserInfo) {
    try {
      console.log(userInfo);

      return this.grpcService.addUser({ userInfo });
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }
}
