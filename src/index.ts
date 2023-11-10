import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import notesRouter from './routes/notes';

const app: Application = express();
dotenv.config();

const PORT = process.env.APP_PORT;
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (res: Response) => {
    res.send('Hello World!');
});
app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
