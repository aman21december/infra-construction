const sequelize = require("../../../config/db");
const { Registration } = require("../../../service/v1/registration");

const main = async (req, res, next) => {
  try {
    res.render("index.ejs")
  } catch (error) {
    next(error);
  }
};


module.exports = {
  main
};
