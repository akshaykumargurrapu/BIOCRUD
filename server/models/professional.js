const mongoose = require("mongoose")
const ProfessionalData = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        linkedin : {type : String},
        company : {type : String},
        skills : {type : Array},
        work : {type : Array}
    },
    { collection: "Professional-Data" }

)


const model = mongoose.model('Professional-Data', ProfessionalData)
module.exports = model
