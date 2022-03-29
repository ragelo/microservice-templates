import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { UsersResolver } from './user.resolver';
import { UserService } from '../user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChannelCredentials } from '@grpc/grpc-js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      debug: false,
      playground: false,
      path: '/graphql-federated',
      typePaths: ['./**/*.federation.graphql', './**/*.graphql'],
    }),
    ClientsModule.register([
      {
        name: 'CONTRY_GRPC',
        transport: Transport.GRPC,
        options: {
          url: process.env.CONTRY_SERVICE_GRPC || 'localhost:6001',
          credentials: ChannelCredentials.createInsecure(),
          package: 'contry',
          protoPath: 'proto/client/contry.proto',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [UsersResolver, UserService],
})
export class GraphQLAppModule {}
