require('dotenv').config({
    path: `./${process.env.NODE_ENV || 'development'}.env`,
  });

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log("error");
})
