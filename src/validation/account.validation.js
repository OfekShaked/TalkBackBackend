const Joi = require("joi");
const isValid = require('./isValid.validation')

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string().required().min(4),
});

const isAccountDataValid = (userData) =>{
    return isValid(schema,userData);
}
module.exports= isAccountDataValid;