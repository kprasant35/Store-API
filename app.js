require('dotenv').config();

//async errors


const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1> <a href="/api/v1/products">Products</a>');
});



app.use('/api/v1/products', productRouter);

//product route



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async()=>{
    try{
        //connect DB
        connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`Server is listening to ${port}...`);
        });
    }catch(err){

    }
}

start();