const path = require('path');
const infraacadmic = require("../../models/infraacademic");
const infraadminstrative = require('../../models/infraadminstrative');
const infraother = require('../../models/infraother');
const crypto= require("crypto");
const { User } = require('../../models/user');
class Form{
    async infraacadmic(req, res, next) {
        console.log(req.body);       
        const arr = req.body;
        const applicationId=crypto.randomBytes(8).toString("hex")
        for (let i = 0; i < arr.length; i++) {
        await infraacadmic.create({...arr[i],collegeId: req.user.id,applicationId});
        }        
    }
    async infraadministrative(req,res,next){
        console.log(req.body);       
        const arr = req.body;
        const applicationId=crypto.randomBytes(8).toString("hex")
        console.log(applicationId    )
        for (let i = 0; i < arr.length; i++) {
        await infraadminstrative.create({...arr[i],collegeId: req.user.id,applicationId});
        }  
    }
    async infraother(req,res,next){
        console.log(req.body);       
        const arr = req.body;
        const applicationId=crypto.randomBytes(8).toString("hex")
        for (let i = 0; i < arr.length; i++) {
        await infraother.create({...arr[i],collegeId: req.user.id,applicationId});
        }  
    }
    async getData(req,res,next){
       const data=await User.findAll({
            where:{
                id:req.user.id,
                role:"SCHOOL"
            },
            attributes: { exclude: ['password'] },
            include: [
              { model:  infraacadmic},
              { model: infraadminstrative },
              { model: infraother },
            ]
        })
        
        console.log(data)
        res.render("previousapplications.ejs",{data})
    }
}

module.exports={Form}
