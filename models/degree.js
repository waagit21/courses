
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var degree = new Schema({

    courseName: String,
    courseSpecification: String,
    type: String,
    degreeOverview: String,
    degreeContent: String,
    totalNumberCourses: String,
    course: Array,
    totalCourses: String,
    online: Array,
    offlinetotal: String,
    offline: Array,    
        //facultyName: String,//facName. Made common in both
        //facultyInfo: Array,    
        //facultyResume: Array,
    facultyInformation: Array, //new
    courseLanguage: String,
    courseCountry: String,
    courseCity: String,
    compulsory: Array,
    optional: Array,
    courseOfferingInstitute: String,
    instituteWebAddress: String,//webaddress. Made common in both
    instituteDetails: String,//instDetails. Made common in both
    medium: String,//teachingmedium. Made common in both
    mediumWebAddress: String,//teachingmediumweb. Made common in both
    mediumDetails: String,//inssdetails. Made common in both
    duration: String,
    durationFor: String,//durationCrit. Made common in both
    hoursPerWeek: String,
    totalCost : String,
    currency: String,
    breakDown: String,//Made common in both
    financialAid: String,
    financialAidDetails: String,
    startingDate: String,//startingdate. Made common in both
    endingDate: String,
    //mainSubject: String,
    creation_date: String,
    isDegree: Boolean,
    status: Number,//New added for admin, in insertion please send value 1.
    owner_type: Number,//New added for admin, in insertion please send value 0.
    owner_id: String,//Changed to ObjectId in database.
    createdby: String,
    updation_date: String,
    updatedby: String

}, {collection: 'courses'});
degree.plugin(mongoosePaginate);
module.exports = mongoose.model('degree', degree);







