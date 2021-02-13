import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

import * as path from 'path';
@Module({
  providers: [],
})
export class ConfigModule {
  static forRoot(database= process.env.DB_CONFIG_NAME): DynamicModule {
    const ePath = path.join(__dirname, '../**/*.entity{.ts,.js}');
    const mPath = path.join(__dirname, '../**/migrations/*{.ts,.js}');
    const provider = TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      migrationsRun: false,
      database: process.env.DB_NAME,
      entities: [ePath],
      migrations: [mPath],
      synchronize: true,
      autoLoadEntities: true,
      logging: ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'],
    });
    return {
      module: ConfigModule,
      imports: [provider],
      // providers: [provider] ,
      exports: [provider],
    };
  }
}
