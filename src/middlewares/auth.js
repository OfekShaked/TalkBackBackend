const jwt = require('jsonwebtoken');
const config = require('../../configs/general_config');
const authorize = require('../services/auth');

const auth = async (req, res, next) =>{
    try{
        if(!req.headers.authorization) throw "Forbidden";
        const token = req.headers.authorization.split(" ")[1];

        const payload = await authorize(token)

        req.payload=payload;
        next();
    }catch(err){
        res.status(401).json({message:"Forbidden!"});
    }
}

module.exports = auth;