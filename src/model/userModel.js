const mongoose = require("mongoose");
const Validations = require('../Validation/validation')

const UserSchema = new mongoose.Schema(
    {
        Name : {
            type : String,
            required :  true ,
            trim : true,
            
        },
        PhoneNumber : {
            type : String,
            required :  true , 
            trim : true,
            unique : true,
    
        },
        Age : {
            type : Number,
            required :  true,
            trim : true,
        },
        password : {
            type : String,
            required :  true ,
            trim:true 
        },
        Pincode : {
            type : Number,
            required :  true,
            trim : true,
   
        },
        SlotStatus :{
            type : String,
            default: "pending",
            enum: {
                values: ["pending", "completed"],
                default : "pending",
                message: "Please enter correct SlotStatus",
              },
        },
        FirstDose : {
            type: String,
            default : "pending",
            enum: {
                values: ["pending", "completed"],
                message: "Please enter correct status",
              },
        
        },
        SecondDose :{
            type: String,
            default: "pending",
            enum: {
                values: ["pending", "completed"],
                message: "Please enter correct status",
              },
       
        },
        VaccinationStatus : {
            type: String,
            default: "pending",
            enum: {
                values: ["pending", "completed"],
                message: "Please enter correct status",
              },
        },
        AadharNo : {
            type : String,
            required : true,
            
        }
    }, { timestamps: true }
)
module.exports = mongoose.model("userModel",UserSchema)

