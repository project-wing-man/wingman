import express, { Express, Request, Response, NextFunction } from "express";
import path from 'path';
import apiRouter from './routes/api';
import { isHttpError } from 'http-errors';
import userRouter from './routes/userRoutes';
import cors from 'cors';

const app: Express = express();
const port = 8080;

// Middleware to parse json and urlencoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', apiRouter);
app.use('/user', userRouter);

// Serve the main index.html file
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Serve CSS and JS assets
app.get('/css/style.css', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../src/index.css'));
});

app.get('/js/index.js', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../src/index.tsx'));
});

// 404 error handling - this should be near the end, right before the general error handler
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ error: 'This page does not exist' });
});

// General error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = 'An error occurred in unknown express middleware';
    let statusCode = 400;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default app;
