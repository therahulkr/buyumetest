/**
Write a post API which modifies the product database based on the given payload.

Suppose you have 10 products with specific quantities in your inventory collection. 
You have to design an API that accepts multiple productIds and add and remove the quantities 
from inventory from the SKUs upon successful API call.

Also, please design the schema for the inventory collection and establish a connection with 
mongodb server running locally or on atlas

Sample POST API call

payload=

[{productId:123,quantity:10,operation:”add”},

{productId:143,quantity:14,operation:”add”},

{productId:193,quantity:17,operation:”subtract”}]




Please note-
Multiple products can be sent in one API call
Create 2 files, one for schema and one for API route
tech stack should be only express and MongoDB
**/

const express = require("express");

const app = express();

const Product = require("./Product");

const Port = 4000;

app.post("/",async (req, res) => {
    const { payload } = req.body;

    payload.forEach((p) => {
       const prod = await Product.findOne({ p.productId });
       if(!prod){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
       }
       if(p.operation === "add"){
        prod.quantity += p.quantity;
        await prod.save();
       }
       else{
        prod.quantity -= p.quantity;
        await prod.save();
       }
    });

    return res.status(200).json({
        success: true,
        message: "successfully updated the products quantity"
    })
})


app.listen(Port,()=>{
    console.log(`server is runs on http://localhost:${Port}`);
})
