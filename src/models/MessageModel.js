const mongoose = require('mongoose');

const MessageModelSchema = mongoose.Schema({
    conversationId:String,
    sender:String,
    text:String
},{timestamps:true});

module.exports=mongoose.model("MessageModel",MessageModelSchema);