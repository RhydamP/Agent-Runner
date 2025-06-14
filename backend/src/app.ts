import express from 'express';
import cors from 'cors';
import runRouter from './routes/run.route';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.use('/run', runRouter);

export default app;
