require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/products');

const productData = require('./products.json');


const start = async ()=>{
    try{

        await connectDB(process.env.MONGO_URL);
        await Product.create(productData);


        process.exit(0);
    }catch(error){
        
        console.log(error);
        process.exit(1);
    }
}

start();