let casbin = require("casbin");
let path = require("path");
let { SequelizeAdapter } = require("casbin-sequelize-adapter");
let { ROLES, PERMS, RESOURCES } = require("../utils/constant");
module.exports = (async () => {
  const adapter = await SequelizeAdapter.newAdapter({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  });

  const enforcer = await casbin.newEnforcer(
    path.join(__dirname, "..", "models", "casbin-model.conf"),
    adapter
  );
  await enforcer.addPolicy(ROLES.SCHOOL,RESOURCES.Form,PERMS.EDIT)
  await enforcer.addPolicy(ROLES.DEO,RESOURCES.DEOPANEL,PERMS.EDIT)
  await enforcer.addPolicy(ROLES.ACS,RESOURCES.ACSPanel,PERMS.EDIT)
  return enforcer;
})();
