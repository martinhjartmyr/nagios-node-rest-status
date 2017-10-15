import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { nagios } from './nagios';

class nnrs {

  public express: express.Application;
  public nagios: nagios;

  constructor(statusPath: string) {
    this.express = express();
    this.middleware();
    this.routes();

    this.nagios = new nagios(statusPath);
    this.nagios.readData();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private routes(): void {
    let router = express.Router();

    router.get('/stats', (req, res, next) => {
      res.json(this.nagios.getStats());
    });
    router.get('/hosts', (req, res, next) => {
      res.json(this.nagios.getHosts());
    });
    router.get('/hosts/failing', (req, res, next) => {
      res.json(this.nagios.getHostsFailing());
    });
    router.get('/services', (req, res, next) => {
      res.json(this.nagios.getServices());
    });
    router.get('/services/failing', (req, res, next) => {
      res.json(this.nagios.getServicesFailing());
    });

    this.express.use('/', router);
  }
}

export { nnrs };
