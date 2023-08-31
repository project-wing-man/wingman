"use strict";
const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((err, req, res, next) => {
    res.status(500).send({
        status: 500,
        message: err.message
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map