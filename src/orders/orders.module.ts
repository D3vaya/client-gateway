import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, ORDERS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    NatsModule,
    // ClientsModule.register([
    //   {
    //     name: ORDERS_SERVICE,
    //     transport: Transport.TCP,
    //     // options: {
    //     //   servers: envs.natsServers,
    //     // },
    //   },
    // ]),
  ],
})
export class OrdersModule {}
