const { urlencoded } = require('express')
const  upload=require('express-fileupload')
const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const app = express()
const User = require('./database')
const verifyToken = require('./verfiyToken')
app.use(upload())
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello")
})
// app.get('/return',verifyToken, (req, res) => {
//     res.sendFile(__dirname + "/home.html", (err) => {
//         if(err){
//             console.log("Error while loading home page", err)
//         }
//     })
// })

app.get('/back', (req, res) => {
    res.sendFile(__dirname + "/index.html", (err) => {
        if(err){
            console.log("Error while loading login page", err)
        }
    })
})
app.get('/returnback', (req, res) => {
    res.sendFile(__dirname + "/user.html", (err) => {
        if(err){
            console.log("Error while loading login page", err)
        }
    })
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html", (err) => {
        if(err){
            console.log("Error while loading login page", err)
        }
    })
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html", (err) => {
        if(err){
            console.log("Error while loading signup page", err)
        }
    })
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/home.html", (err) => {
        if(err){
            console.log("Error while loading home page", err)
        }
    })
})

app.get('/landingpage', (req, res) => {
    res.sendFile(__dirname + "/landing.html", (err) => {
        if(err){
            console.log("Error while loading landing page", err)
        }
    })
})
app.get('/job', verifyToken,(req, res) => {
    res.sendFile(__dirname + "/job.html", (err) => {
        if(err){
            console.log("Error while loading  job page", err)
        }
    })
})

app.post('/userLogin', async (req, res) => {
    const data = req.body;
    let user_password = data.password;
    let user_email = data.email;
    const user_data = await User.findOne({email: user_email})
    // console.log(user_data);
    if(!user_data){
       res.status(400);
       res.send("User doesn't exist"); 
    }
    let db_password = user_data.password;
    //matching password
    const isValid = await bcrypt.compare(user_password.toString(), db_password);
    //taking action for incorrect password
    if(!isValid)
    {
        res.status(400)
        return res.send("Incorrect Password")
    
    }
     
    //generate token
    const token_to_send = jwt.sign({id: user_data._id}, "mySecretKey", { expiresIn: '8s'})
    res.cookie('my_token', token_to_send);
   
    return res.redirect('/home')

})

app.post('/userSignup', async (req, res) => {
    const data = req.body;
    // console.log(data);
    if(data.password !== data.cpassword){
        return res.send("Incorrect Password");
    }
    let user_name = data.name;
    let user_email = data.email;
    let user_password = data.password;
    if(!user_name || !user_email || !user_password){
        res.status(400)
        return res.send("Fields are empty")
    }
    const user_data = await User.findOne({email: user_email})
    if(user_data){
        res.status(400);
        return res.send("User already exists");
    }
    const salt = await bcrypt.genSalt(10)
    let hashed_password = await bcrypt.hash(user_password.toString(), salt)
    // hashed_password = hashed_password.toString()
    const data_to_store = new User({name: user_name, email: user_email, password: hashed_password})
    const result = await data_to_store.save()
    res.redirect('/login')
})
app.post('/userJob', async (req, res) => {
    const data = req.body;
    
    let user_fname = data.fname;
    let user_lname = data.lname;
    let user_email = data.email;
    let user_dateofbirth=data.dateofbirth;
    let user_mobile=data.mobile;
    let user_jobrole=data.jobrole;
    let user_gender=data.gender;
    let user_address=data.address;
    let user_city=data.city;
    let user_pincode=data.pincode;
    let user_passport=data.passport;
    let user_class_X=data.class_X;
    let user_Inter1st=data.Inter1st;
    let user_Inter2nd=data.Inter2nd;
    let user_Higher=data.Higher;


    

    // if(!user_fname || !user_lname   ||!user_email ||!user_jobrole ||!user_gender ||!user_address|| !user_city || !user_pincode ||!user_dob){
    //     res.status(400)
    //     return res.send("Fields are empty")
    // }
    const user_data = await User.findOne({email: user_email ,fname:user_fname,lname:user_lname})
    if(user_data){
        res.status(400);
        return res.redirect('/returnback')
    }
    // const salt = await bcrypt.genSalt(10)
    // let hashed_password = await bcrypt.hash(user_password.toString(), salt)
    const data_to_store = new User({  mobile:user_mobile, dateofbirth:user_dateofbirth,  fname: user_fname,  lname:user_lname,  email:user_email,   jobrole:user_jobrole,   gender:user_gender,   address:user_address,   city:user_city,    pincode:user_pincode,
      passport:user_passport ,   class_X:user_class_X,   Inter1st:user_Inter1st,   Inter2nd:user_Inter2nd,   Higher:user_Higher})
    const result = await data_to_store.save()

    res.redirect("/back")
    // res.redirect('/home')
})
app.post('/return' , (req,res)=>{
    res.redirect('/home')
})
// app.post('/returnback' , (req,res)=>{
//     res.redirect('/home')
// })
app.post('/logout', (req, res) => {
    // if(window.confirm("Do you want to logout?")){
        // res.clearCookie('my_token')
        res.redirect('/landingpage')

})
app.post('/job', (req, res) => {
    
        // res.clearCookie('my_token')
    //     res.redirect('/landingpage')
    
    res.redirect('/job')
})
app.listen(5000, () => {
    console.log("Listening on Port 5000")
})


