const { Application } = require("../../../service/v1/application");

const postApplication = async(req,res,next)=>{
    try {
        return await new Application().postApplication(req,res,next)
    } catch (error) {
      next(error);
    }  
}
const postApplicationinfraadmin = async(req,res,next)=>{
    try {
        return await new Application().postApplicationinfraadmin(req,res,next)
    } catch (error) {
      next(error);
    }  
}
const postApplicationinfraother = async(req,res,next)=>{
    try {
        return await new Application().postApplicationinfraother(req,res,next)
    } catch (error) {
      next(error);
    }  
}

module.exports={postApplication,postApplicationinfraadmin,postApplicationinfraother};