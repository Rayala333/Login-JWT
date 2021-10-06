const express = require('express');
const mongoose = require('mongoose');
const prasad = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors');

const app = express();

//mongoose connection
const mongo="mongodb+srv://Rayala:prasad@cluster0.tifav.mongodb.net/Rayala?retryWrites=true&w=majority";

mongoose.connect(mongo).then((res)=>{
    console.log("db connected")},
    (err)=>{
        console.log(err)
    }
)


app.use(express.json());

app.use(cors({origin:"*"}));

//posting register:--start
app.post('/register',async(req,res)=>{
    try{

        const { username,email,password,confirmpassword}= req.body;

        let exist = await prasad.findOne({email})
        if(exist){
            return res.status(400).send('User Already Exist')
        };
        if(password !== confirmpassword){
            return res.status(400).send('Passwords Are Not Matching');
        }
         
        let newuser = new prasad({
            username,
            email,
            password,
            confirmpassword
        })

        await newuser.save();
        res.status(200).send('Registered successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})
//posting register:--End



//posting Login:--start

app.post('/login',async(req,res)=>{
    try{
        const { email,password}= req.body;

        let exist = await prasad.findOne({email});
        if(!exist){
            return res.status(400).send("User Not Found");
        }
        if(exist.password !== password){
            return res.status(400).send("Invalid Password");
        }


        let payload ={
            user:{
                id:exist.id
            }
                     }
                        //key is jwtsecret
        jwt.sign(payload,'jwtsecret',{expiresIn:3400000},(err,token)=>{
                                                    if(err) throw err;
                                                    return res.json({token})
                                                              }
                )
         }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

//posting Login:--end

//posting myprofile:--start

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let exist = await prasad.findById(req.user.id);
        if(!exist){
            return res.status(400).send("User Mg-Id Not Found");
        }
        res.json(exist);
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Server Token Error')
    }
})
//posting myprofile:--end



app.listen(5000,()=>{
    console.log('srver running on port 5000')
})