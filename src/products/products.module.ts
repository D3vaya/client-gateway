import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule,
    // ClientsModule.register([
    //   {
    //     name: NATS_SERVICE,
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers,
    //     },
    //   },
    // ]),
  ],
})
export class ProductsModule {}
