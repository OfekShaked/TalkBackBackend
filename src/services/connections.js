const authorize = require("./auth");
const account = require("./account");

class ConnectionsService{
    async checkIfConnected(token){
        try{
            const payload = await authorize(token)
           const res = await account.setUserOnline(payload.username);
           if(res.status===200) return {status:200,message:"Connection is successfull"};
           return {status:401,message:"invalid credentials"};
        }catch(err){
            return {status:401,message:"invalid credentials"};
        }
    }

}
module.exports = new ConnectionsService();