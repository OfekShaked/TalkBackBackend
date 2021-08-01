const UserModel = require("../models/UserModel");
const crypto = require("crypto");
const isAccountDataValid = require("../validation/account.validation");
const encryption = require("./encryption");
const config = require("../../configs/general_config")
const jwt = require("jsonwebtoken");

class AccountService {
  // Difining algorithm
  algorithm = "aes-256-cbc";
  // Defining key
  key = null;
  // Defining iv
  iv = null;
  cipher = null;
  constructor() {
    this.key = JSON.parse(JSON.stringify(encryption.key));
    this.iv = JSON.parse(JSON.stringify(encryption.iv));
  }

  async register(userData) {
    try {
      if (isAccountDataValid(userData)) {
        if (await this.isUsernameFree(userData.username)) {
          let password = this.encrypt(userData.password);
          await UserModel.create(
            { username: userData.username, password: password, isOnline:false },
            function (err, awesome_instance) {
              if (err) return handleError(err);
              // saved!
            }
          );
          return { status: 200, message: "Added successfully" };
        } else {
          return { status: 201, message: "Username already exist" };
        }
      } else return { status: 400, message: "Invalid" };
    } catch (err) {
      return handleError(err);
    }
  }
  async login(userData,socketId) {
    try {
      if (isAccountDataValid(userData)) {
        if (await this.isLoginSuccessfull(userData)) {
          const token = await jwt.sign({username:userData.username},config.SECRET,{expiresIn:'1d'});
          return { status: 200, message: "Logged in successfully" ,token:token};
        } 
      }
        return { status: 201, message: "Invalid Credentials" };
    } catch (err) {
      return handleError(err);
    }
  }

  async logout(userData){
    try{
      await UserModel.findOneAndUpdate(
        {
          username: userData.username
        },
        {
          onlineStatus:{isOnline:false,socketId:""}
        },
        "username"
      )
      return {status:200, message:"Logged out"};
    }catch(err){
      return handleError(err);
    }
  }

  async isLoginSuccessfull(loginData) {
    return (
      (await UserModel.findOneAndUpdate(
        {
          username: loginData.username,
          password: this.encrypt(loginData.password),
        },
        {
          onlineStatus:{isOnline:true,socketId:""}
        },
        "username"
      )) !== null
    );
  }

  async setUserOnline(username,socketId){
    try{
      await UserModel.findOneAndUpdate(
        {
          username: username
        },
        {
          onlineStatus:{isOnline:true,socketId:socketId}
        },
        "username"
      )
      return {status:200, message:"Logged in"};
    }catch(err){
      return handleError(err);
    }
  }
  

  async isUsernameFree(username) {
    try {
      return (
        (await UserModel.findOne({ username: username }, "username")) === null
      );
    } catch (err) {
       handleError(err);
       return false;
    }
  }

  encrypt(password) {
    this.cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      Buffer.from(this.iv)
    );
    let encrypted = this.cipher.update(password);
    // Using concatenation
    encrypted = Buffer.concat([encrypted, this.cipher.final()]);

    // Returning iv and encrypted data
    return encrypted.toString("hex");
  }
}

const handleError=(error)=>{
  console.log(error);
  return { status: 400, message: "Error" };
}
module.exports = new AccountService();
