import { Module } from '@nestjs/common';
import { RecordsModule } from './records/records.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRecord } from './entities/records-service.entity';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'service_records_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true, // sql in console
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql'),
        federation: {
          version: 2,
        },
      },
      sortSchema: true,
      playground: true,
    }),
    RecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
