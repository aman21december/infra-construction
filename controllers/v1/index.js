const { createApi } = require("./general");
const { getRegistration,postRegistration } = require("./registrationController");
const { postfetchotp } = require("./fetchotpcontroller");
const { main } = require("./main");
const { login,logout}=require("./authcontroller")
const { getData,searchAndFilter}=require("./Deopanel")
const { getData2}=require("./ACSPanel")
const { postApplication,postApplicationinfraadmin,postApplicationinfraother}=require("./application")
const { school,postacademic,postadministrative,postother,data}=require("./formcontroller");

module.exports = {
  createApi,getRegistration,postRegistration,postfetchotp,main,login,logout,school,postacademic,postadministrative,postother,data,getData,postApplication,postApplicationinfraadmin,postApplicationinfraother,getData2,searchAndFilter
};
