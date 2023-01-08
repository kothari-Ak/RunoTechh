const mongoose = require("mongoose");


const AdminSchema = new mongoose.Schema(
    {PhoneNumber:String,
    }, { timestamps: true }
)
module.exports = mongoose.model("Admin",AdminSchema)