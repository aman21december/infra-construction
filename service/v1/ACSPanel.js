const infraacadmic = require("../../models/infraacademic");
const infraadminstrative = require("../../models/infraadminstrative");
const infraother = require("../../models/infraother");
const { User } = require("../../models/user");

class ACSPanel{
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
        res.render("ACSPanel.ejs",{data:data.rows,
            currentPage: page,
             totalPages: totalPages})
    }
}

module.exports={ACSPanel}