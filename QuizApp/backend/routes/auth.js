const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

// Validation for creating a user
const createUserValidation = [
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

// Validation for logging in a user
const loginUserValidation = [
  body("email", 'Enter a valid email').isEmail(),
  body("password", 'Password cannot be blank').exists(),
];

// Define routes using the authController functions
router.post("/createuser", createUserValidation, authController.createUser);
router.post("/login", loginUserValidation, authController.loginUser);
router.post("/getuser", fetchuser, authController.getUser);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// var fetchuser = require('../middleware/fetchuser');

// // const JWT_SECRET = ""

// // ROUTE 1 : create a User using POST "/api/auth/createuser". doesn't require Auth
// router.post(
//   "/createuser",
//   [
//     body("name").isLength({ min: 3 }),
//     body("email").isEmail(),
//     body("password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     console.log(req)
//     var success = false;
//     // If there are errors, return that req and the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       console.log("email", req.body.email)
//       // check whether the user with this email exists already
//       // let user = await User.findOne({ email: req.body.email });
//       // if (user) {
//       //   return res
//       //     .status(400)
//       //     .json({ success, error: "sorry a user with this email already exists" });
//       // }else{
//       //   const salt = await bcrypt.genSalt(10);
//       //   const secPass = await bcrypt.hash(req.body.password, salt)
//       //   // Create a new user


//       const salt = await bcrypt.genSalt(10);
//       const secPass = await bcrypt.hash(req.body.password, salt)
//       let user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: secPass,
//       });

//       // using bcrypt

//       //   .then(user => res.json(user))
//       // .catch(err=> console.log(err));
//       // res.json({error: 'please enter a unique value for email', message: err.message})

//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       const JWT_SECRET = "helloiamsecret"
//       const authToken = jwt.sign(data, JWT_SECRET);

//       //res.json(use)
//       // success = true;
//       // console.log(jwtData);
//       res.json({ success: true, authToken });

//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("some error occured")
//     }
//   }
// );

// // ROUTE 2 : Authenticate a User using POST "/api/auth/login". No login required
// router.post(
//   "/login",
//   [
//     body("email", 'Enter a valid email').isEmail(),
//     body("password", 'Password cannot be blank').exists(),
//   ],
//   async (req, res) => {
//     // console.log(req.body.password);
//     var success = false;
//     // If there are errors, return bad req and the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//       // to find whether the exists or not
//       let user = await User.findOne({ email });
//       // if user doesnt exist
//       if (!user) {
//         //  success: false;

//         return res.status(400).json({ error: "Please try to login with correct credentials" });
//       }

//       // to match the hashes internally and returns true/false
//       // console.log(user.password);
//       const passwordCompare = await bcrypt.compare(password, user.password);
//       console.log("Stored", password);
//       if (!passwordCompare) {
//         success: false;
//         return res.status(400).json({ success, error: "Please try to login with correct credentials" });
//       }

//       // 
//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       const JWT_SECRET = "helloiamsecret";
//       const authToken = jwt.sign(data, JWT_SECRET);
//       success = true;
//       res.json({ success, authToken });

//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error")
//     }
//   });

// // ROUTE 3 : Get logged in User details using : POST "/api/auth/getuser" .Login required
// router.post("/getuser", fetchuser, async (req, res) => {

//   try {
//     userId = req.user.id;
//     const user = await User.findById(userId).select("-password")
//     res.send(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error")
//   }
// });


// module.exports = router;
