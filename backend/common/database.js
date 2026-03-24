const mongoose = require('mongoose');

async function connectDatabase(){
    try{
        await mongoose.connect("mongodb://localhost:27017/appDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database connected successfully");
    }catch(err){
        console.error("Database connection error:",err);
    }
}

connectDatabase();