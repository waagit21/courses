var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courses=new Schema({
  
    courseName: String,
    courseSpecification: String,
    type: String,
    courseBreakDown: String,
    mode: String,//Different
    //degreeOverview: String,
    //degreeContent: String,
    //totalNumberCourses: Number,
    //course: Array,
    //totalCourses: Number,
    //online: Array,
    //offlinetotal: Number,
    //offline: Array,    
    facultyName: String,
    //facultyInfo: Array,
    facultyResume: Array,
    courseLanguage: String,
    courseCountry: String,
    courseCity: String,
    //compulsory: Array,
    //optional: Array,
    courseOfferingInstitute: String,
    instituteWebAddress: String,// Made common in both
    instituteDetails: String,// Made common in both
    medium: String,//mediumInstitute. Made common in both
    mediumWebAddress: String,//mediumInstituteWebAddress. Made common in both
    mediumDetails: String,//mediumInstituteDetails. Made common in both
    duration: String,
    durationFor: String,
    hoursPerWeek: String,
    totalCost : String,
    currency: String,
    breakDown: String,//courseBreakDown. Made common in both
    financialAid: String,
    financialAidDetails: String,
    startingDate: String,// Made common in both
    endingDate: String,
    part: String,//Different
    //mainSubject: String,
    programSpecs: String,//Different
    programName: String,//Different
    programType: String,//Different ProgramType
    degree: String,//Different
    creation_date: String,
    isDegree: Boolean,
    status: Number,//New added for admin, in insertion please send value 1.
    owner_type: Number,//New added for admin, in insertion please send value 0.
    owner_id:String //Changed to ObjectId in database.

}, {collection: 'courses'});

module.exports = mongoose.model('courses', courses);