var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var institute = new Schema({
    instituteType: String,
    instituteName: String,
    institutionMode: String,
    department: Array,
    imageSet: Array,
    instituteAddress: String,
    campuses: Array,
    program: Array,
    instituteFacilitation: String,
    instituteWebAddress: String,
    instituteEmail: String,
    institutePhoneNumber: String,
    instituteWhatsAppNumber: String,
    faculty: Array,
    instituteMarkOfDistinction: String,
    status: Number,  
    creation_date: String,
},
    { timestamps: true }
);
institute.plugin(mongoosePaginate);
module.exports = mongoose.model('institute', institute);