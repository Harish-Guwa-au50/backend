const express = require('express')
const app = express()
const mongoose = require('mongoose');
const { stringify } = require('uuid');
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://Harish:12345@cluster0.gl6dy5a.mongodb.net/BE'?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err) => {
        if(err){
            console.log("Connection Failed", err)
        }
        else{
            console.log("Connection Success");
        }
    }
)

const userSchema = new mongoose.Schema({
    fname: String,
    lname:String,
    email: String,
    password: String,
    mobile:Number,
    jobrole:String,
    gender:String,
    address:String,
    city:String,
    pincode:Number,
    passport:String,
    dateofbirth:String,
    class_X:{
        type:String
    },
   Inter1st:{
        type:String
    },
    Inter2nd:{
        type:String
    },
    Higher:{
        type: String
    }
//     fname:{
//         type: String,
    
//     },
//     lname:{
//         type: String,

//     },
//     email:{
//         type: String,
     
//     },
//     Date:{
//        type: Number
//     },
//     password:{
//         type: String,
//     },
//     Mobile:{
//         type: String,
//         // required:true,
//         // unique:true
//     },
//    jobrole:{
//         type: String,
//         // required:true

//     },
//     gender:{
//         type: String,
//         // required:true
        
//     },
//    address:{
//         type: String,
//         // required:true
        
//     },
//    city:{
//         type: String,
//         // required:true
        
//     },
//     pincode:{
//         type: Number,
//         // required:true
        
//     },
//     passport:{
//         type:String
//     }

})

const User = new mongoose.model("user_collection", userSchema);

app.listen(5010, () => {
    console.log("Listening to MongoDB on port 5010")
})

module.exports = User;
// mongoose.connect('mongodb://127.0.0.1:27017/backend',
// const url=('mongodb://127.0.0.1:27017/learning_mongodb',
