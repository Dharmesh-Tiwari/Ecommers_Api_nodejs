const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../models/User"); // Assuming your schema is in a file named UserSchema.js

// Create a nodemailer transporter with Ethereal email account
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 'arrajashu@gmail.com',
    pass: 'xiozoamjsanxuhux'
  },
});

// Registration
router.post("/register", async (req, res) => {
  try {
          const { username, email, password } = req.body;
      
          // Check if user with the given email already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user
          const newUser = new User({
            username,
            
             email,
             password: hashedPassword,
          });
      
          // Save the user to the database
           await newUser.save();
      
           return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const { email, password, otpCode } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Check if the provided OTP code matches the stored OTP code
    if (user.otpCode !== otpCode) {
      return res.status(401).json({ message: "Invalid OTP code" });
    }

    // Clear the OTP code from the user documenta
    user.otpCode = undefined;
    await user.save();

    // You can generate and return a token here for authentication

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Forget Password===================---------------------------------------------

router.post("/forget-password", async (req, res) => {
  try {
      const { email } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate an OTP code
    const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Update the user document in the database with the generated OTP code
    user.otpCode = otpCode;
    await user.save();

    // Prepare the email content
    const mailOptions = {
      from: "arrajashu@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP code is: ${otpCode}`,
    };

    // Send the email
    const info = await transporter.sendMail({
      from: "arrajashu@gmail.com", // sender address
      to: "dharamtiwari001@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world", // plain text body
      html: "<b>Hello world</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;








// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");
// const User = require("../models/User"); // Assuming your schema is in a file named UserSchema.js

// // Create a nodemailer transporter with Ethereal email account
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: 'shea.stiedemann@ethereal.email',
//     pass: 'edvhdFnZmNtJC38hVe'
//   },
// });

// // Registration
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user with the given email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Login
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Check if user with the given email exists
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Check if the provided password matches the stored password
// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: "Invalid password" });
// //     }

// //     // You can generate and return a token here for authentication

// //     return res.status(200).json({ message: "Login successful" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password, otpCode } = req.body;

//     // Check if user with the given email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the provided password matches the stored password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // Check if the provided OTP code matches the stored OTP code
//     if (user.otpCode !== otpCode) {
//       return res.status(401).json({ message: "Invalid OTP code" });
//     }

//     // Clear the OTP code from the user document
//     user.otpCode = undefined;
//     await user.save();

//     // You can generate and return a token here for authentication

//     return res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });


// // Forget Password
// // router.post("/forget-password", async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     // Check if user with the given email exists
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Generate and send a password reset link or email to the user

// //     return res.status(200).json({ message: "Password reset link sent" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// router.post("/forget-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if user with the given email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate an OTP code
//     const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//     // Update the user document in the database with the generated OTP code
//     user.otpCode = otpCode;
//     await user.save();

//     // Prepare the email content
//     const mailOptions = {
//       from: "your_email@gmail.com",
//       to: user.email,
//       subject: "Password Reset OTP",
//       text: `Your OTP code is: ${otpCode}`,
//     };

// //     // Send the email
// //     const info = await transporter.sendMail(mailOptions);
// //     console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));

// //     return res.status(200).json({ message: "Password reset OTP code sent" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // Send the email
//      const info = await transporter.sendMail({
//       from: '"Dharmesh Tiwari" <dharmeshtiwari1000@example.com>', // sender address
//       to: "sawlanimohnish@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world", // plain text body
//       html: "<b>Hello world</b>", // html body
//     });
//     console.log("Message sent: %s", info.messageId);

//     res.json(info);
// }catch (error) {
//   console.error(error);
//   res.status(500).json({ message: "Internal server error" });
// }


// module.exports = router;






