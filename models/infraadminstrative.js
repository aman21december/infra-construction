const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { User } = require('./user');

const infraadminstrative = sequelize.define('infraadminstrative', {
    collegeId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    SerialNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Serial no is required"
            }
        }
    },
    CollegeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"College name is required"
            }
        }
    },
    nameofproposal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"name of proposal is required"
            }
        }
    },
    Estimate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Estimate is required"
            },
        }
    },
    sourceoffunds: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"source of funds is required"
            },
        }
    },
    Amount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Amount is required"
            },
            isNumeric:{
                msg:"Amount must be numeric"
            }
        }
    },
    ReasonfornotspendingfrominternalSourcefunds: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Reason for not spending from internal Source funds  is required"
            },
        }
    },
    Remarks: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Remarks is required"
            },
        }
    },
    UploadEstimateDocument: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Upload Estimate Document is required"
            },
        }
    },
    UploadOtherDocument: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg:"Upload Other Document is required"
            },
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"Pending"
    },
    applicationId:{
        type: DataTypes.STRING,
        allowNull:false
    },
    reason: {
      type: DataTypes.STRING, // Store reason for rejection or hold
      allowNull: true
    },
    sanctionId: {
      type: DataTypes.STRING, // For approved requests, store sanction ID or cheque number
      allowNull: true
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
User.hasMany(infraadminstrative, { foreignKey: 'collegeId' });
infraadminstrative.belongsTo(User, { foreignKey: 'collegeId' });

module.exports = infraadminstrative;