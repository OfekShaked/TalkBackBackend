const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
    members:Array,
},{timestamps:true});

module.exports=mongoose.model("ConversationModel",ConversationSchema);