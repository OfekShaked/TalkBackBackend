const router = require('express').Router();
const conversationService = require("../services/conversation");

//new conv
router.post("/create",(req,res)=>{
    try{
        await conversationService.newConversation(req.body);
    }catch(err){

    }
})

//get user's conv
router.get("/:username",async(req,res)=>{
    try{
        const responseRecieved = await conversationService.getUserConv(req.params.username);
        if(responseRecieved.status===200){
            res.status(200).json(responseRecieved.conversation);
        }else{
            res.status(responseRecieved.status).json(responseRecieve.message);
        }
    }catch(err){
        res.status(400).json("Error");
    }
})

module.exports= router;