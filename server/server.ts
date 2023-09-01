const express = require('express');
const app = express();
const port = 8080;
//const apiRouter = require('./routes/api');

//@ts-ignore 
app.get('/', (req, res) => {
  res.send('Hello World!');
})

//@ts-ignore
app.use('/api', ((req, res) => {
  res.send('Hello World!');
}));

//global error handler
//@ts-ignore 
app.use((err, req, res, next) => {
  res.status(500).send({
    status: 500,
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;