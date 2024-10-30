const { Op } = require("sequelize");
const infraacadmic = require("../../models/infraacademic");
const infraadminstrative = require("../../models/infraadminstrative");
const infraother = require("../../models/infraother");
const { User } = require("../../models/user");

class deopanel{
    async getData(req,res,next){
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 1; 
        const offset = (page - 1) * limit; 
        const data = await User.findAndCountAll({
            where: { role: 'SCHOOL' },
            attributes: { exclude: ['password'] },
            include: [
              { model: infraacadmic },
              { model: infraadminstrative },
              { model: infraother },
            ],
            limit: limit,
            offset: offset,
          });
          const totalPages = Math.ceil(data.count / limit);
    res.render("deopanel.ejs",{data:data.rows,
           currentPage: page,
            totalPages: totalPages})
}
async searchAndFilter(req,res,next){
    const {applicationId,CollegeName,status,startDate, endDate}=req.query
    const filters = {};
    if (CollegeName) filters.CollegeName = { [Op.like]: `%${CollegeName}%` };
    if (applicationId) filters.applicationId = applicationId;
    if (status) filters.status = status;
    if (startDate && endDate) {
        filters.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }   
    try{
        const data1=await infraacadmic.findAll({
            where:filters
        })
        const data2=await infraadminstrative.findAll({
            where:filters
        })
        const data3=await infraother.findAll({
            where:filters
        })
        console.log(data1)
        console.log(data2)
        console.log(data3)

        const combinedData = [
            { infraAcadmic: data1 },
            { infraAdministrative: data2 },
            { infraOther: data3 }
        ];

        return res.json(combinedData);
    }catch(err)
    {
        return next(err)
    }
}
}

module.exports={deopanel}