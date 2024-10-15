const { ErrorHandler } = require("../../helper");
const { UNAUTHORIZED, SERVER_ERROR } = require("../../helper/status-codes");
const { User } = require("../../models/user");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
class Auth{
    async login(req,res,next){
       try{
        const username = req.body.username;
       const password = req.body.password;
       const user=await User.findOne({
        where:{
            username
        }
       }) 
       if (!user) {
        return res.status(401).send('Invalid email or password.');
      }
      if(user.role=="SCHOOL"){
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password.');
          }
      }
      else{
        if(!(user.password==password))
            return res.status(401).send('Invalid email or password.');
      }
      
       const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d' });
        const options={
            expires:new Date(Date.now()+7*24*60*60*1000),
            httpOnly:true,
            
        }
        if(user.role==="SCHOOL"){
        res.status(200).cookie("token",token,options).redirect("/v1/school")
        }
        else if(user.role==="DEO"){
            res.status(200).cookie("token",token,options).redirect("/v1/deopanel/deo")
        }
        else if(user.role==="ACS"){
            res.status(200).cookie("token",token,options).redirect("/v1/acspanel/acs")
        }
       }catch(err){

        return(next(err))
       } 
    }
    async logout(req,res,next){
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).redirect("/v1/index")
    }
}

module.exports={Auth}