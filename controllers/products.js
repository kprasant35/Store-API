const Product = require('../models/products');

const getAllProductsStatic = async(req,res)=>{
    const products = await Product.find({featured: true});
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async(req,res)=>{
    
    const {featured, name, company, rating, sort, fields, offset, limit} = req.query; // this is done for filtering only those query which we can process.
    const queryObject = {};

    if(featured){
        queryObject.featured = (featured==='true'?true:false);
    }
    if(name){
        queryObject.name = {$regex:name, $options: 'i'};
    }
    if(company){
        queryObject.company = company;
    }
    if(rating){
        queryObject.rating = Number(rating);
    }

    const result = Product.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' '); // join because mongoDB accept paramters seperated by spaces .sort(name rating);
        result.sort(sortList);
    }else{
        result.sort('createdAt')
    }

    if(fields){
        const fieldList = fields.split(',').join(' '); // join because mongoDB accept paramters seperated by spaces .select(name rating);
        result.select(fieldList);
    }

    if(offset){
        const skip = Number(offset);
        result.skip(skip);
    }

    if(limit){
        result.limit(Math.min(10,Number(limit)));
    }else{
        result.limit(10);
    }

    const products = await result;

    res.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
};