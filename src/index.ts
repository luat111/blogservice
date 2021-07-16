import 'reflect-metadata';
require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import Routers from './routes/index';

const app = express();
createConnection();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

Routers.map(route => {
    app.use(route);
});


app.listen(process.env.PORT || 3001);
console.log(`Server is running on port: ${process.env.PORT}`);

