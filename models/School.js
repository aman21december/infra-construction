const { OTP_EXPIRE } = require("../utils/constant");
const sequelize =require("./../config/database");
const {DataType, DataTypes}=require("sequelize")

const School=sequelize.define("School",{
    schoolcode:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    schoolname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    district:{
        type:DataTypes.STRING,
        allowNull:false
    },
    block:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    otp:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    otpexpiry:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
},{timestamps:true})

sequelize.sync().then(() => {
    console.log('School table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports=School;