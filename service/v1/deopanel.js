const infraacadmic = require("../../models/infraacademic");
const infraadminstrative = require("../../models/infraadminstrative");
const infraother = require("../../models/infraother");
const { User } = require("../../models/user");

class deopanel{
    async getData(req,res,next){
const data = await User.findAll({
  where: { role: 'SCHOOL' },
  attributes: { exclude: ['password'] },
  include: [
    { model:  infraacadmic},
    { model: infraadminstrative },
    { model: infraother }, 
  ]
});
res.render("deopanel.ejs",{data})

// res.json(collegeData)
    }
}

module.exports={deopanel}