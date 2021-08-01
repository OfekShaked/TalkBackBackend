const jwt = require('jsonwebtoken');
const config = require('../../configs/general_config');

const auth = async (token) =>{
    try{
        const payload = await jwt.verify(token,config.SECRET)
        return payload;
    }catch(err){
        throw new Error("Forbidden");
    }
}

module.exports = auth;