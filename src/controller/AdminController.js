const userModel = require("../model/userModel");
const AdminModel = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const slotModel = require('../model/slotModel');


const getUserDetails = async (req, res) => {
  try {
   
    const data = req.body;
    let {Age, Pincode,FirstDose,VaccinationStatus,}=data
    let filter = {};
    if(Age)
    {
      filter['Age'] = Age
    }
    if(Pincode)
    {
      filter['Pincode'] = Pincode
    }
    if(FirstDose)
    {
      filter['FirstDose'] = FirstDose
    }
    if(VaccinationStatus)
    {
      filter['VaccinationStatus'] = VaccinationStatus
    }
    const findUser = await userModel.find(filter);
    if(findUser.length == 0 )
    {
      return res.status(400).send({ status : false , msg : "no user available"})
    }
    return res.status(200).send({ userDetails: findUser });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const loginAdmin = async function (req, res) {
  try {
    let { PhoneNumber } = req.body;

    let findAdmin = await AdminModel.findOne({ PhoneNumber: PhoneNumber });
    if (!findAdmin)
      return res
        .status(400)
        .send({ status: false, message: "Invalid Login Credential" });

    let payload = { userId: findAdmin._id, iat: Date.now() };

    let token = jwt.sign(payload, "runoTech", { expiresIn: "24h" });

    res.setHeader("x-api-key", token);
    res
      .status(200)
      .send({
        status: true,
        message: "Admin login successfull",
        data: { adminId: findAdmin._id, token },
      });
  }     catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

const slotDetails =async (req, res)=>{
  try{
  const data = req.body
  let{date,Pincode,Hospital}=data
  let query = {}
  if(!date) return res.status(400).send({ status : false , msg : "please enter Date"})
  query["date"] = date
  if(Pincode)
  {
    query["Pincode"] = Pincode
  }
  if(Hospital)
  {
    query["Hospital"] = Hospital
  }
  const findUser =await slotModel.find(query)
  return res.status(200).send({userDetails:findUser}); 
  }
 catch (err) {
  res.status(500).send({ msg: "Error", error: err.message });
}}

module.exports = {getUserDetails, loginAdmin ,slotDetails}