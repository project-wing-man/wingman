"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const http_errors_1 = require("http-errors");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/api', api_1.default, (req, res) => {
    res.status(200).json(res.locals.fetchFlights);
});
app.get('/', (req, res) => {
    console.log('line 11');
});
app.get('/css/style.css', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../src/index.css'));
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../index.html'));
});
app.get('/js/index.js', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../src/index.tsx'));
});
app.use('*', (req, res) => {
    res.status(404).json({ error: 'This page does not exist' });
});
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = 'An error occurred in unknown express middleware';
    let statusCode = 400;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map