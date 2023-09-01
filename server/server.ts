
import express, { Express, Request, Response, NextFunction } from "express";
import path from 'path';
import apiRouter from './routes/api';
import { isHttpError } from 'http-errors';
import userRouter from './routes/userRoutes';

const app: Express = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded());

//protected route for our api
app.use('/api', apiRouter)

app.get('/', (req: Request, res: Response) => {
  console.log('line 11')
  //res.send('Hello World!');
});

app.get('/css/style.css', (req: Request, res: Response)  => {
  res.sendFile(path.resolve(__dirname, '../src/index.css'));
});

//serve the index.html file
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// server JS file to general path
app.get('/js/index.js', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../src/index.tsx'));
});

app.use('/user', userRouter,)


//404 error handling
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'This page does not exist' })
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An error occurred in unknown express middleware';
  let statusCode = 400;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

export default app;
