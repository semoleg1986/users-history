import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://vxmfehla:lwSmdKVZ4T4uX7gxRNk-WTkpyW6KWnyY@crow.rmq.cloudamqp.com/vxmfehla',
          ],
          // urls: ['amqp://admin:admin@my_rabbitmq:5672'],
          queue: 'main-queue',
          noAck: true,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
