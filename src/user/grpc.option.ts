
import { Transport, ClientOptions } from '@nestjs/microservices';
import {  join } from 'path';
console.log(join(__dirname,'user.proto'));

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url:'127.0.0.1:4000',
    package: 'user',
    protoPath: join(__dirname, 'user.proto'),
  },
};
