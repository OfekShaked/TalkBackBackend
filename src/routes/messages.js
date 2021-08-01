const router = require('express').Router();
const messagesService = require('../services/messages');

//add message
router.post("/add",async(req,res)=>{
    try{
        await messagesService.addMessage(req.body);
        res.status(200).json("Success");
    }catch(err){
        res.status(400).json("Error");
    }
})

//get message
router.get("/get/:conversationId",async (req,res)=>{
    try{
        const responseRecieved = await messagesService.getConvMessage(req.params.conversationId);
        if(responseRecieved.status===200){
            res.status(200).json(responseRecieve.messages);
        }else{
            res.status(400).json(responseRecieved.message);
        }
    }catch(err){
        res.status(400).json("Error");
    }
})

module.exports= router;