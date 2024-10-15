const sequelize = require("../../../config/db");
const { Registration } = require("../../../service/v1/registration");

const postfetchotp =async(req,res,next)=>{
    try{
        return new Registration().verifyotp(req,res,next)
    }
    catch(error){
        next(error);
    }
}

module.exports = {
postfetchotp
};
