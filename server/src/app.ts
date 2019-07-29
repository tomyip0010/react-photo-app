import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import errorMiddleware from './middleware/errorMiddleware';
import { requestLoggerMiddleware } from './helper/requestLogger';
import route from './route';
 
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(bodyparser.json());
app.use(requestLoggerMiddleware);
app.use(route);
app.use(errorMiddleware);
 
export { app }