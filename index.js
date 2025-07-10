const express = require('express');
var app = express();

app.use(express.json())

const userRouter = require('./routes/user')
const indexRouter = require('./routes/index')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/uploads', express.static('uploads'));

app.listen(8080, () => {
    console.log("Server berjalan di http://localhost:8080");
});