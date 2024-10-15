const {ACSPanel}=require("./../../../service/v1/ACSPanel")

const getData2= async(req,res,next)=>{
    try {
        return await new ACSPanel().getData(req,res,next)
    } catch (error) {
      next(error);
    }  
}

module.exports={getData2};