const sequelize = require("../../../config/db");
const { Form } = require("../../../service/v1/form");


const school =async(req,res,next)=>{
    try{
        res.render("school.ejs")
    }
    catch(error){
        next(error);
    }
}
const postacademic =async(req,res,next)=>{
    try{
       return new Form().infraacadmic(req,res,next)
    }
    catch(error){
        next(error);
    }
}
const postadministrative =async(req,res,next)=>{
    try{
       return new Form().infraadministrative(req,res,next)
    }
    catch(error){
        next(error);
    }
}
const postother =async(req,res,next)=>{
    try{
       return new Form().infraother(req,res,next)
    }
    catch(error){
        next(error);
    }
}
const data =async(req,res,next)=>{
    try{
       return new Form().getData(req,res,next)
    }
    catch(error){
        next(error);
    }
}
module.exports = {
school,postacademic,postadministrative,postother,data
};
