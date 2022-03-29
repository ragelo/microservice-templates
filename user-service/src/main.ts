import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GRPCAppModule } from './grpc/module';
import { GraphQLAppModule } from './graphql/module';
import { ServerCredentials } from '@grpc/grpc-js';
import * as morgan from 'morgan';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    GRPCAppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.GRPC_PORT || 6000}`,
        credentials: ServerCredentials.createInsecure(),
        package: 'user',
        protoPath: 'proto/user.proto',
      },
    },
  );
  const graphQLApp = await NestFactory.create(GraphQLAppModule);
  graphQLApp.use(morgan('tiny'));

  await Promise.all([
    grpcApp.listen(),
    graphQLApp.listen(process.env.PORT || 3000),
  ]);
}

bootstrap();
