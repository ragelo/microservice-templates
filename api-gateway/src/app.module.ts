import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        playground: true,
        context: ({ req }) => {
          const user = req.headers.user ? JSON.parse(req.headers.user) : null;
          return { user };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'User',
              url:
                process.env.USER_SERVICE_GRAPHQL ||
                'http://127.0.0.1:3000/graphql-federated',
            },
            {
              name: 'Contry',
              url:
                process.env.CONTRY_SERVICE_GRAPHQL ||
                'http://127.0.0.1:3001/graphql-federated',
            },
          ],
        }),
        // TODO: Add authentication middleware for express
        // buildService({ name, url }) {
        //   return new RemoteGraphQLDataSource({
        //     url,
        //     willSendRequest({ request, context }) {
        //       request.http.headers.set(
        //         "X-GRAPHQL-AUTHENTICATED-USER",
        //         context['user'] ? JSON.stringify(context['user']) : null
        //       );
        //     }
        //   });
        // }
      },
    }),
  ],
})
export class AppModule {}
