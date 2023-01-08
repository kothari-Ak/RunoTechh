const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validation = require("../Validation/validation");


let nameRegex = /^[a-zA-Z ]+$/;

let ageRegex = /^[1-9]?[0-9]{1}$|^100$/;

let mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;


let AadharRegex = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let{Name,Age,PhoneNumber,password, Pincode, AadharNo}=data

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should not be Empty.. " });
    }

    if (!Name || typeof Name == "undefined" || Name == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the Name" });
    }
    if (!nameRegex.test(Name)) {
      return res
        .status(400)
        .send({ Status: false, message: "Please enter a valid Name ⚠️⚠️" });
    }

    if (!PhoneNumber || typeof PhoneNumber == "undefined" || PhoneNumber == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the Phone number" });
    }

    if (!mobileRegex.test(PhoneNumber)) {
      return res
        .status(400)
        .send({
          Status: false,
          message: "Please enter valid Indian Phone number ⚠️⚠️",
        });
    }

    if (PhoneNumber) {
      let checkmobile = await userModel.findOne({ PhoneNumber: PhoneNumber });

      if (checkmobile) {
        return res
          .status(400)
          .send({
            Status: false,
            message:
              "Please provide another number, this number has been used ⚠️⚠️",
          });
      }
    }

    if (!Age || typeof Age == "undefined" || Age == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the Age" });
    }

    if (!ageRegex.test(Age)) {
      return res
        .status(400)
        .send({ Status: false, message: "Please enter a valid age ⚠️⚠️" });
    }

    
    if (!password || typeof password == "undefined" || password == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the password" });
    }
    if (!validation.isValidPassword(data.Password)) {
      return res.status(400).send({
        status: false,
        msg: "Password should contain minimum 8 and maximum 15 characters"});
    }
    data.password = await bcrypt.hash(data.password, 10);

    if (!Pincode || typeof Pincode == "undefined" || Pincode == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the Pincode" });
    }

    if (!validation.isValid(Pincode)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter valid pincode." });
    }
    if (!validation.isValidPincode(Pincode)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter valid pincode." });
    }
    

    if (!AadharNo || typeof AadharNo == "undefined" || AadharNo == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the Aadhar number" });
    }

    if (!validation.isValid(AadharNo)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter valid Aadhar number." });
    }

if(!AadharRegex.test(AadharNo)){ // should have white spaces after every 4 digits
  return res
  .status(400)
  .send({ status: false, msg: "Enter valid Aadhar number." });
}

    const createUser = await userModel.create(data);
    return res.status(201).send({ status: true, msg: createUser });
  }catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
  
};

const userLogIn = async (req, res) => {
  try {
    const data = req.body;

    const { PhoneNumber, password } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should not be Empty.. " });
    }
    if (!PhoneNumber) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter the phone number." });
    }
    if (!validation.isValid(PhoneNumber)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter valid phone number." });
    }
    
    const user = await userModel.findOne({ PhoneNumber: PhoneNumber });
    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "This user is not registered" });

        if (!password) {
          return res
            .status(400)
            .send({ status: false, message: " please enter the password" });
        }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(400).send({ message: "Please provide the correct password" });

    let token = jwt.sign(
      {
        userId: user.PhoneNumber.toString(),
      },
      "VaccineRegistrationApp",
      { expiresIn: "12h" }
    );
    res.setHeader("x-api-key", token);
    console.log(token);
   res.status(200).send({
      status: true,
      message: "User login successfull",
  });
}  catch (err) {
  res.status(400).send({ status: false, msg: err.message })
}
};

const UpdateUser = async function (req, res) {
  try {
    const data = req.body;

    const userId = req.params.userId;

    const user = await userModel.findById(userId);  
    if(!user) return res.status(400).send({ status: false, message: "user doesn't exists" });

    let timestamp = new Date().getTime();
    const getTime = timestamp - user.createdAt.getTime();
    if (getTime / 1000 > 864000) {
      return res.status(400).send({
        status: false,
        msg: "can't update your profile after 24 hour",
      });
    }
    const updatedData = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set:  {...data} },
      {new:true }
  
    );
    return res.status(200).send({ status: true, msg: updatedData });
  }  catch (err) {
    res.status(400).send({ status: false, msg: err.message })
  }
};

module.exports = { createUser, UpdateUser, userLogIn };
