const { Op } = require("sequelize");
const School = require("../../models/School");
const nodemailer = require("nodemailer");
const crypto= require("crypto")
const bcrypt=require("bcryptjs");
const { User } = require("../../models/user");
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7c9d2abed0cdfe",
    pass: "e51342feeaa697"
  }
});

class Registration {
  async postRegistration(req, res, next) {
    const { schoolcode, schoolname, district, block, email } = req.body;
    console.log(req.body);

    try {
      let existingSchool = await School.findOne({
        where: {
          [Op.or]: [{ email: email }, { schoolcode: schoolcode }]
        }
      });

      if (existingSchool) {
        if (!existingSchool.isVerified) {
          const otp = Math.floor(Math.random() * 1000000);
          existingSchool.otp = otp;
          existingSchool.otpexpiry = Date.now() + 15 * 60 * 1000;
          await existingSchool.save();

          let mailOptions = {
            from: 'no-reply@gmail.com',
            to: email,
            subject: 'Resend OTP Verification',
            text: `Your OTP is ${otp}. It will expire in 15 minutes.`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ message: 'Failed to resend OTP email.' });
            }
            res.status(200).render("otp.ejs", { message: 'OTP resent to email. Please verify.',email });
          });

        } else {
          return res.status(400).json({ message: 'School is already registered and verified.' });
        }
      } else {
        const otp = Math.floor(Math.random() * 1000000);
        const newSchool = await School.create({
          schoolcode,
          schoolname,
          district,
          block,
          email,
          otp,
          otpexpiry: Date.now() + 15 * 60 * 1000,
          isVerified: false
        });

        let mailOptions = {
          from: 'noreply@gmail.com',
          to: email,
          subject: 'OTP Verification',
          text: `Your OTP is ${otp}. It will expire in 15 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ message: 'Failed to send OTP email.' });
          }
          res.status(200).render("otp.ejs", { message: 'OTP sent to email. Please verify.',email });
        });
      }
    } catch (error) {
      return next(error);
    }
  }
  async verifyotp(req,res,next){
    const {email,otp}=req.body;

  try {
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }
    const school = await School.findOne({ where: { email } });

    if (!school) {
      return res.status(400).json({ message: 'School not found.' });
    }

    if (school.otp !== otp || school.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    const password = crypto.randomBytes(8).toString('hex'); 
    const hashedPassword = await bcrypt.hash(password, 10);

    school.isVerified = true;

    await school.save();

    User.create({username:email,password:hashedPassword})
    let mailOptions = {
        from: 'no-reply@gmail.com',
        to: email,
        subject: 'Your School Credentials',
        text: `Your login credentials are:\nUsername: ${email}\nPassword: ${password}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Failed to send credentials email.' });
        }
        res.status(200).json({ message: 'Credentials sent to email. Please log in on http://localhost:5000/v1/index.' });
      });
    }catch(err){
        res.status(500).json({ message: 'Server error.' });
    }
  }
}

module.exports = { Registration };
