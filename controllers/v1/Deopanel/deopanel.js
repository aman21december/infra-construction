const {deopanel}=require("./../../../service/v1/deopanel")

const getData = async(req,res,next)=>{
    try {
        return await new deopanel().getData(req,res,next)
    } catch (error) {
      next(error);
    }  
}

module.exports={getData};