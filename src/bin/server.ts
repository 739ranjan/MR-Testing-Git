import http from 'http';
import app from '../index';
import Logger from '../utils/logger';
import {initRedis} from '../config/redis.config';
import UserModel, {IUser, IUserMethods} from "../models/user.model";
import {Request} from 'express';
import dotenv from "dotenv";
import {Express} from "../types/passport";
import User = Express.User;
import {HydratedDocument} from "mongoose";
import {ICaregiver} from "../models/caregiver.model";

/**
 * An interface representing the custom Express request object.
 */
export interface ICustomExpressRequest extends Request {
  currentUser?: IUser;
  // currentCaregiver?:ICaregiver;
}

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  Logger.debug(`Listening on ${bind}`);

  Logger.info(`🚀 Server listening on port ${bind}`);
};

server.listen(port);
initRedis().then(_ =>null);
server.on('error', onError);
server.on('listening', onListening);
