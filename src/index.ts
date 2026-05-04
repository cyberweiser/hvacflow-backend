import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth';
import customerRouter from './routes/customers';
import siteRouter from './routes/sites';
import jobRouter from './routes/jobs';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.use((req, res, next) => {
  // attach prisma to request for handlers
  (req as any).prisma = prisma;
  next();
});

app.use('/auth', authRouter);
app.use('/customers', customerRouter);
app.use('/sites', siteRouter);
app.use('/jobs', jobRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
