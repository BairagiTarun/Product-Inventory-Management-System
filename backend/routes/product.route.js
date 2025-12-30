const express=require('express');
const router=express.Router();
const Product=require('../models/product.model.js');
router.post('/products',async(req,res)=>{
    try{
        const {productCode,productName,category,price}=req.body;
       if (!productCode || !productName || !category || price === undefined || price < 0) {
    return res.status(400).json({ message: "Invalid product data" });
}
        const product=new Product({
        productCode,
        productName,
        category,
        price
        });
        await product.save();
        return res.status(201).json({ message: "Product Added", product });
    }
    catch(err)
    {
    return res.status(500).json({ message: err.message });
    }
});
router.get('/products',async(req,res)=>{
    try{
        const products = await Product.find();
        return res.status(200).json(products);
    }
    catch(err)
    {
    return res.status(500).json({ message: err.message });
    }
});

router.get('/products/:id',async(req,res)=>{
    try{
        if(!req.params.id)
        {
            return res.status(400).json({ message:"No Product ID Given"});
        }
        const product=await Product.findById(req.params.id);
        if(!product)
        {
      return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    }
    catch(err)
    {
    return res.status(500).json({ message: err.message });
    }
});
router.put('/products/:id',async(req,res)=>{
    try{
        const productId=req.params.id;
        if(!productId)
        {
            return res.status(400).json({message:"No Product ID Given"});
        }
        const {productName,price}=req.body;
        if (!productName || price === undefined || price < 0) {
        return res.status(400).json({ message: "Invalid product data" });
    }
        product = await Product.findByIdAndUpdate(req.params.id,
            { productName, price },
         );
    return res.status(200).json({ message: "Product Updated", product });
    }
catch(err)
{
    return res.status(500).json({ message: err.message });
}
});
router.delete('/products/:id',async(req,res)=>{
  try{
    const productId=req.params.id;
    if(!productId)
    {
        return res.status(400).json({message:"No Product ID Given"});
    }
    const product=await Product.findById(productId);
    if(!product)
    {
        return res.status(404).json({message:"No Product found"});
    }
    await product.deleteOne();
    return res.status(200).json({ message: "Product Deleted", product });
  }
  catch(err)
  {
    return res.status(500).json({ message: err.message });
  }
});
module.exports=router;