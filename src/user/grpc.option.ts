
import { Transport, ClientOptions } from '@nestjs/microservices';
import {  join } from 'path';
console.log(join(__dirname,'user.proto'));

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, 'user.proto'),
  },
};
