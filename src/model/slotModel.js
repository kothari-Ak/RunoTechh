const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const slotSchema = new mongoose.Schema(
    {
        date : {
            type : Date,
            require : true,
        },
        Hospital : {
            type : String,
            require : true
        },
        Pincode : {
            type : Number,
            require : true, 
        },
        slots : [{
            slotsTime : { type : String},
            patients : [{ type : ObjectId , ref : "userModel"}],
            slotsBooked : { type : Number , default : 0}
    }],   
    }
)
module.exports = mongoose.model("slot",slotSchema)