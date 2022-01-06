import 'reflect-metadata';
import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import OMRConfig from './settings/orm-config';
import { DomainController } from './module/domain/controller/domain.controller';

class Server {
  private domainController: DomainController;
  private app: express.Application;

  constructor() {
    this.domainController = new DomainController();
    this.app = express(); // init the application
  }

  /**
   * Method to configure the server,
   */
  public configuration() {
    this.app.set('port', Number(process.env.SERVER_PORT) || 3001);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Method to configure the routes
   */
  public async routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello world!');
    });
    this.app.use('/api/v1', this.domainController.router);
  }

  /**
   * Used to start the server
   */
  public init() {
    dotenv.config();
    createConnection(OMRConfig)
      .then(async (connection) => {
        this.configuration();
        this.routes();
        this.app.listen(Number(process.env.SERVER_PORT), process.env.SERVER_ADDRESS!, () => {
          console.log('🌴 Database connection was successful!');
          console.log(`Running on : http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT!} ⚡`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const server = new Server(); // Create server instance
server.init(); // Execute the server
