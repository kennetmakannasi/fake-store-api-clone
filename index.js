const express = require('express');
var app = express();

app.use(express.json())

app.set('view engine', 'ejs')

const apiRouter = require('./routes/api')
const indexRouter = require('./routes/index')

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/uploads', express.static('uploads'));

const port = process.env.APP_PORT || 8080;

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});