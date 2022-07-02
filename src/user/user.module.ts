import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


console.log(`address pf .proto file is===>${join(__dirname, 'user.proto')}`);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url:'127.0.0.1:4000',
          package: 'user',
          protoPath: join(__dirname, 'user.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
