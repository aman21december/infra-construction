const infraacadmic = require("../../models/infraacademic")
const infraadminstrative = require("../../models/infraadminstrative")
const nodemailer=require("nodemailer");
const School = require("../../models/School");
const { User } = require("../../models/user");
const infraother = require("../../models/infraother");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7c9d2abed0cdfe",
      pass: "e51342feeaa697"
    }
  });
class Application{
    async postApplication(req,res,next){
        const {status,reason,sanctionId}=req.body
        const {applicationId}=req.params
        try{
            const application=await infraacadmic.findOne({where:{
                applicationId:applicationId
            }})
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
              }
            if (status === 'Rejected' || status === 'On Hold') {
            if (!reason) {
                return res.status(400).json({ message: 'Reason is required for hold/rejection.' });
            }
            application.reason = reason;
            }
            if (status === 'Approved') {
            if (!sanctionId) {
                return res.status(400).json({ message: 'Sanction ID or cheque number is required for approval.' });
            }
            application.sanctionId = sanctionId;
            }
            application.status = status;
            await application.save(); 
       

            const school = await User.findByPk(application.collegeId);
            const email = school.username;
            let message;
          
            if (status === 'Approved') {
              message = `Your application has been approved. Sanction ID/Cheque Number: ${sanctionId}`;
            } else if (status === 'On Hold') {
              message = `Your application is on hold. Reason: ${reason}. Please update the details.`;
            } else if (status === 'Rejected') {
              message = `Your application has been rejected. Reason: ${reason}. You can reapply.`;
            }
          
          
            let mailOptions = {
              from: 'no-reply@gmail.com',
              to: email,
              subject: 'Application Status Update',
              text: message
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            res.redirect("/v1/deopanel") 
        }
        catch(err){
            return next(err)
        }
    }
    async postApplicationinfraadmin(req,res,next){
        const {status,reason,sanctionId}=req.body
        const {applicationId}=req.params
        try{
            const application=await infraadminstrative.findOne({where:{
                applicationId:applicationId
            }})
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
              }
            if (status === 'Rejected' || status === 'On Hold') {
            if (!reason) {
                return res.status(400).json({ message: 'Reason is required for hold/rejection.' });
            }
            application.reason = reason;
            }
            if (status === 'Approved') {
            if (!sanctionId) {
                return res.status(400).json({ message: 'Sanction ID or cheque number is required for approval.' });
            }
            application.sanctionId = sanctionId;
            }
            application.status = status;
            await application.save(); 
       

            const school = await User.findByPk(application.collegeId);
            const email = school.username;
            let message;
          
            if (status === 'Approved') {
              message = `Your application has been approved. Sanction ID/Cheque Number: ${sanctionId}`;
            } else if (status === 'On Hold') {
              message = `Your application is on hold. Reason: ${reason}. Please update the details.`;
            } else if (status === 'Rejected') {
              message = `Your application has been rejected. Reason: ${reason}. You can reapply.`;
            }
          
          
            let mailOptions = {
              from: 'no-reply@gmail.com',
              to: email,
              subject: 'Application Status Update',
              text: message
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            res.redirect("/v1/deopanel") 
        }
        catch(err){
            return next(err)
        }
    }
    async postApplicationinfraother(req,res,next){
        const {status,reason,sanctionId}=req.body
        const {applicationId}=req.params
        try{
            const application=await infraother.findOne({where:{
                applicationId:applicationId
            }})
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
              }
            if (status === 'Rejected' || status === 'On Hold') {
            if (!reason) {
                return res.status(400).json({ message: 'Reason is required for hold/rejection.' });
            }
            application.reason = reason;
            }
            if (status === 'Approved') {
            if (!sanctionId) {
                return res.status(400).json({ message: 'Sanction ID or cheque number is required for approval.' });
            }
            application.sanctionId = sanctionId;
            }
            application.status = status;
            await application.save(); 
       

            const school = await User.findByPk(application.collegeId);
            const email = school.username;
            let message;
          
            if (status === 'Approved') {
              message = `Your application has been approved. Sanction ID/Cheque Number: ${sanctionId}`;
            } else if (status === 'On Hold') {
              message = `Your application is on hold. Reason: ${reason}. Please update the details.`;
            } else if (status === 'Rejected') {
              message = `Your application has been rejected. Reason: ${reason}. You can reapply.`;
            }
          
          
            let mailOptions = {
              from: 'no-reply@gmail.com',
              to: email,
              subject: 'Application Status Update',
              text: message
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            res.redirect("/v1/deopanel") 
        }
        catch(err){
            return next(err)
        }
    }
}
module.exports={Application}