import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url:'0.0.0.0:4000',
      package: 'user',
      protoPath: join(__dirname, 'user/user.proto'),
    },
  });
  await app.startAllMicroservices();
  const port = 4000;
  await app.listen(port);
}
bootstrap();
