// import express from "express";
// import path from 'path';
// import apiRouter from './routes/api';
// import { isHttpError } from 'http-errors';

const express = require('express')
const path = require('path')
const apiRouter = require('./routes/api')
const { isHttpError } = require('http-errors');

const app = express();
const port = 8080;
app.use(express.json());
app.use('/', apiRouter, (req, res) => {
    res.send('Howdy');
});
app.get('/', (req, res) => {
    console.log('line 11');
});
app.use(express.urlencoded({ extended: true }));
console.log('Line 18 of server file');
app.get('/css/style.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/index.css'));
});
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});
app.get('/js/index.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/index.tsx'));
});
app.use('*', (req, res) => {
    res.status(404).json({ error: 'This page does not exist' });
});
app.use((error, req, res, next) => {
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
// export default app;
module.exports =  app;
//# sourceMappingURL=server.js.map