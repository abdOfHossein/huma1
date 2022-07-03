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
  async findOne(@Param('id') id: string) {
    try {
      console.log(id);
      const result = this.grpcService.findOne({ id });
      console.log(`result of Get Req in api-gateway service:${result}`);
      return result;
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }

  @Post('creat')
  async addUser(@Body() userInfo: any) {
    try {
      console.log(userInfo);
      const {firstName,lastName,phoneNumber} =userInfo;
      console.log({firstName,lastName});
      
      return this.grpcService.addUser({firstName,lastName,phoneNumber:12});
    } catch (error) {
      console.log(`err of findOne in api-gateway controller:${error}`);
    }
  }
}
