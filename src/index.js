const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const route = require('./route/routes.js');
const app=express();
const port = process.env.PORT || 3000;
const url ="mongodb+srv://Anjali-11:Krishna@cluster0.hhecqj7.mongodb.net/RunoTech";
mongoose.set('strictQuery', true);

app.use(multer().any())
app.use(express.json());

mongoose.connect(url)
.then(() => console.log("MongoDB is Connected"))
.catch((err) => console.log(err));

app.use('/',route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}`));