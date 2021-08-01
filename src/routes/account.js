const express = require('express');
const router = express.Router();
const accountService = require('../services/account')
const connectionsService = require('../services/connections');

router.post("/register",async (req,res)=>{
    try{
    const responseRecieved = await accountService.register(req.body)
    res.status(responseRecieved.status).json(responseRecieved.message);
    }catch(err){
        res.status(400).json({message:"Could not register"});
        handleError(err);
    }
});

router.post("/login", async(req,res)=>{
    try{
        const responseRecieved = await accountService.login(req.body)
        res.status(responseRecieved.status).json({message:responseRecieved.message,token:responseRecieved.token});
    }catch(err){
            res.status(400).json({message:"Could not login"});
            handleError(err);
        }
})

router.post("/logout",async(req,res)=>{
    try{
        const responseRecieved = await accountService.logout(req.body)
        res.status(responseRecieved.status).json(responseRecieved.message);
    }catch(err){
        res.status(400).json({message:"Could not logout"});
        handleError(err);
    }
});

router.post("/isconnected",async(req,res)=>{
    try{
        if(!req.headers.authorization) throw "Forbidden";
        const token = req.headers.authorization.split(" ")[1];
        const responseRecieved = await accountService.checkIfConnected(token)
        res.status(responseRecieved.status).json({message:responseRecieved.message});
    }catch(err){
        res.status(400).json({message:"Could not logout"});
        handleError(err)
    }
})

const handleError = (err)=>{
    console.log(err);
}

module.exports = router;