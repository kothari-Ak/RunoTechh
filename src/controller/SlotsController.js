const { query } = require("express");
const slotModel = require("../model/slotModel");
const validation=require("../Validation/validation")

const createSlot = async function (req, res) {
  try {
    let data = req.body;
    let {date, Hospital, Pincode, slots}=data

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should not be Empty.. " });
    }

    date=new Date()

    if (!date || typeof date == "undefined" || date == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the date" });
    }
  
  if(date== "Invalid Date")
    {
      return res.status(400).send({ status : false , msg : "please provide date in YYYY-MM-DD Format"})
    }

    if (!Hospital || typeof Hospital == "undefined" || Hospital == " ") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the hospital" });
    }

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
    
  
    slots = [];
    let startTime = 10;    
    for (let i = 0; i < 7; i++) {
      let x = "00";
      for (let j = 1; j <= 2; j++) {
        {
          slots.push({ slotsTime: `${startTime}:${x}`, patients: [] });
          x = "30";
        }
      }
      startTime = startTime + 1;
    }
    const createSlot = await slotModel.create(data);
    return res.status(201).send({ status: true, msg: createSlot });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


const bookSlot = async function (req, res) {
  try {
    let userId = req.params.userId;// add pincode and hospital 
    let data = req.body
    
    let {slots}=data
    
    if(!slots["slotsTime"]) return res.status(400).send({status : false , msg : "please provide slot time to BookSlot"})
    let Query=req.query
    
    let{Pincode,Hospital}=Query
    if(Pincode && Hospital)
    {
      Query['Pincode'] = Pincode
      Query['Hospital'] = Hospital
    }
    else { return res.status(400).send({ status : false , msg : " Please enter PinCode and Hospital Name to book slot"})}
    let slot = await slotModel.findOne(Query);  
    for (let i = 0; i < slot["slots"].length; i++) {
      if (slotsTime == slot["slots"][i].slotsTime) {
        if (slot["slots"][i].slotsBooked > 9) {
          return res.status(400).send({
            status: false,
            msg: "slots are full for this timeSlot please try Other time slot",
          });
        }
        slot["slots"][i].patients.push(userId);
        slot["slots"][i].slotsBooked += 1;
      }
    }
    const slotBook = await slotModel.findOneAndUpdate(
      { _id: slot._id },
      { $set: { ...slot } },
      { runValidators: true }
    );
    return res
      .status(201)
      .send({ status: true, msg: slotBook });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createSlot, bookSlot };
