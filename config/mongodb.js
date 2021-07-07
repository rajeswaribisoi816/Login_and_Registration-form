const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://connection:system@cluster0.umupn.mongodb.net/Registration?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error){
        return console.log("connection failed")
    }
    console.log("connection established")
});