const sequelize = require("../../../config/db");
const { Registration } = require("../../../service/v1/registration");

const getRegistration = async (req, res, next) => {
  try {
    res.render("registration.ejs")
  } catch (error) {
    next(error);
  }
};
const postRegistration =async(req,res,next)=>{
    try{
        return new Registration().postRegistration(req,res,next)
    }
    catch(error){
        next(error);
    }
}

module.exports = {
  getRegistration,postRegistration
};
