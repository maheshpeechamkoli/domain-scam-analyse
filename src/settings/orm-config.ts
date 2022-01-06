import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { Domain } from '../module/domain/entity/domain.entity';

import dotenv from "dotenv";
dotenv.config();

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'domain_service',
  synchronize: true,
  entities: [Domain],
  migrationsRun: true,
  migrations: [join(__dirname, 'src/migration/**/*.ts')],
  name: 'domain_scam'
} as ConnectionOptions;
