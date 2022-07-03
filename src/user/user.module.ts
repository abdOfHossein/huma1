import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


console.log(`address pf .proto file is===>${join(__dirname, 'user.proto')}`);

@Module({
  imports: [
    
  ],
  controllers: [UserController],
})
export class UserModule {}
// ClientsModule.register([
//       {
//         name: 'USER_PACKAGE',
//         transport: Transport.GRPC,
//         options: {
//           package: 'user',
//           protoPath: join(__dirname, 'user.proto'),
//         },
//       },
//     ]),