$(document).ready(function() {
	var url_id= getParameterByName('id');
	if (url_id== null || url_id==""){
		$("#courseSpecification").prepend("<option value='' selected='selected'>Please Select</option>");
		$("#type").prepend("<option value='' selected='selected'>Please Select</option>");
		$("#courseLanguage").prepend("<option value='' selected='selected'>Please Select</option>");	
		$("#courseCountry").prepend("<option value='' selected='selected'>Please Select</option>");		
		$("#durationFor").prepend("<option value='' selected='selected'>Please Select</option>");
		$("#status").prepend("<option value='' selected='selected'>Please Select</option>");
	}

	$('#startingDate').datepicker({
		format: 'yyyy/mm/dd',
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	});
	$('#endingDate').datepicker({
		format: 'yyyy/mm/dd',
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	});
        
    $('#degreeOverview').bind('input propertychange', function() { CharLimit(this, 100, 1); }).trigger('propertychange');
	$('#instituteDetails').bind('input propertychange', function() { CharLimit(this, 100, 2); }).trigger('propertychange');
	$('#mediumDetails').bind('input propertychange', function() { CharLimit(this, 100, 3); }).trigger('propertychange');

	SetTextbox($('#hdncourse').val(),"course","Course Name");
	SetTextbox($('#hdnonline').val(),"online","Online Course Name");
	SetTextbox($('#hdnoffline').val(),"offline","Offline Course Name");
	SetTextbox($('#hdncompulsory').val(),"compulsory","List of Compulsory Subjects");
	SetTextbox($('#hdnoptional').val(),"optional","List of Optional Subjects");

	// $('#startingDate').val(formatDate($('#startingDate').val()));
	// $('#startingDate').datepicker({
	// 	format: 'yyyy/mm/dd',
	// 	inline: true,
	// 	firstDay: 1,
	// 	showOtherMonths: true,
	// 	dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	// });

	// var course = $('#hdncourse').val();
	// if(course!="" && course!=null){
	// 	var arr = course.split(",");
	// 	$('#course').val(arr[0]);		
	// 	for (i = 1; i < arr.length; i++) {
	// 		AddTextbox ($('#lnkcourse'),'course','Course Name',arr[i]);
	// 	}
	// }


	// $("#degreeOverview").on('input propertychange', function () {
	// 	CharLimit(this, 100, 1);
	// });
	// $("#instituteDetails").on('input propertychange', function () {
	// 	CharLimit(this, 100, 2);
	// });
	// $("#mediumDetails").on('input propertychange', function () {
	// 	CharLimit(this, 100, 3);
	// });

	// $("#type").change(function () {	
	// 	RemoveSelect("type", this.value) 	      
	// });
	// $("#status").change(function () {	
	// 	RemoveSelect("status", this.value) 	      
    // });
});

$(document).on('blur','.vlditm', function(){
	//$(this).parent().closest('[id]').attr('id')
	//$(this).parent().parent().attr('id');
	var id= $(this).attr('id');
	if($("#"+id).val() != "") {
		$("#dv"+id+" .help-inline").hide().text("");
		$("#dv"+id).removeClass("error");
	}
	if(id=="email")	{
		if($("#"+id).val() != "") {
			if (ValidEmail($("#"+id).val())) {
				$("#dvemail").addClass("error");
				$("#dvemail .help-inline").show().text("Invalid email.");
			}
		}
	}
});

function AddTextbox (elm,name,place,val) {
	var value="";
	if(val!="" && val!=null && val!=undefined){
		value = 'value="'+val+'"';
	}
    var fieldHTML = '<div class="field_wrapper"> <input name="'+name+'" type="text" class="span6 m-wrap smpbrd" placeholder="'+place+'" '+value+' /> <a href="javascript:void(0);" onclick="RemoveTextbox(this)" class="remove_button" title="Remove field"><i class="fa fa-minus fa-lg" aria-hidden="true"></i></a> </div>';
	$(elm).parent('div').append(fieldHTML); //Add field html
}
function RemoveTextbox (elm) {
	$(elm).parent('div').remove(); //Remove field html
}
function SetTextbox (data,name,place) {
	if(data!="" && data!=null){
		var arr = data.split(",");
		$('#'+name).val(arr[0]);		
		for (i = 1; i < arr.length; i++) {
			AddTextbox ($('#lnk'+name),name,place,arr[i]);
		}
	}	
}
function CharLimit(input, maxChar, val) {
    var len = $(input).val().length;	
	$('#textCounter' + val).text(len + '/' + maxChar);
	if (len > maxChar-1) {
        $(input).val($(input).val().substring(0, maxChar));
		$('#textCounter' + val).text(maxChar + '/' + maxChar);
    }	
    //$('#textCounter' + val).text(maxChar - len + ' characters remaining');
    // if (len > maxChar) {
    //     $(input).val($(input).val().substring(0, maxChar));
    //     $('#textCounter' + val).text(0 + ' characters remaining');
    // }
}
function RemoveSelect(id, val) {
	var first = $("#"+ id +" option:first").val();
	if(first==""){
		if(val!="" && val!=null){
			$("#" + id).find("option").eq(0).remove();
		} 
	}
}
function CheckImages() {
    //var x = document.getElementById("facultyResume");
	var x = $('#facultyResume')[0];;
    var msg = "";    
    if ('files' in x) {
        if (x.files.length == 0) {
            //msg = "Select one or more images.";
        }
		else if (x.files.length > 3) {
            msg = "Only 3 files allowed";
        }
        else {
            for (var i = 0; i < x.files.length; i++) {
                var err = 0;
                var txt = "";
                var file = x.files[i];
                if ('name' in file) {
                    txt = "<strong>" + file.name + ":</strong>";
                    if (CheckExtension(file.name) == 1) {
                        err = 1;
                        txt += " Invalid file extension,Only pdf and doc/docx files allowed.";
                    }
                }                
                if ('size' in file) {
                    // if (file.size < 50) {
                    //     err = 1;
                    //     txt += "invalid file";
                    // }
                    if (file.size > 4194304) {
                        err = 1;
                        txt += " File size must be less then 4MB";
                    }
                }
                if (err == 1) {
                    msg += txt + "<br />";
                }
            }
        }      
    }
	return msg;
    // if (msg != null && msg != "") {
    //     $("#errMsg").html(msg);
    //     return false;
    // }
    // else {
    //     return true;
    // }    
}
function CheckExtension(pic) {
    var allowedFiles = [".doc", ".docx", ".pdf"];
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (!regex.test(pic.toLowerCase())) {
        return 1;
    }
    else {
        return 0;
    }
}
function Validate() {
	var url_id= getParameterByName('id');
	var chk=0;
	$(".help-inline").hide().text("");
	$(".control-group").removeClass("error");
	
	var courseName = $("#courseName").val();
	var courseSpecification = $("#courseSpecification").val();
	var type = $("#type").val();
	var degreeOverview = $("#degreeOverview").val();
	var degreeContent = $("#degreeContent").val();
	var totalNumberCourses = $("#totalNumberCourses").val();
	var course = $("#course").val();
	var totalCourses = $("#totalCourses").val();
	var online = $("#online").val();
	var offlinetotal = $("#offlinetotal").val();
	var offline = $("#offline").val();
	var facultyName = $("#facultyName").val();
	//var facultyResume = $("#facultyResume").val();
	var courseLanguage = $("#courseLanguage").val();
	var courseCountry = $("#courseCountry").val();
	var courseCity = $("#courseCity").val();
	var compulsory = $("#compulsory").val();
	var optional = $("#optional").val();
	var courseOfferingInstitute = $("#courseOfferingInstitute").val();
	var instituteWebAddress = $("#instituteWebAddress").val();
	var instituteDetails = $("#instituteDetails").val();
	var medium = $("#medium").val();
	var mediumWebAddress = $("#mediumWebAddress").val();
	var mediumDetails = $("#mediumDetails").val();
	var duration = $("#duration").val();
	var durationFor = $("#durationFor").val();
	var hoursPerWeek = $("#hoursPerWeek").val();
	var totalCost = $("#totalCost").val();
	var currency = $("#currency").val();
	var breakDown = $("#breakDown").val();
	//var financialAid = $("#financialAid").val();
	var financialAidDetails = $("#financialAidDetails").val();
	var startingDate = $("#startingDate").val();
	var endingDate = $("#endingDate").val();
	var status = $("#status").val();
	
	if (courseName == "") {
		$("#dvcourseName").addClass("error");
		$("#dvcourseName .help-inline").show().text("Please enter degree");
		chk = 1;
	}
	if (courseSpecification == "") {
		$("#dvcourseSpecification").addClass("error");
		$("#dvcourseSpecification .help-inline").show().text("Please select degree specification");
		chk = 1;
	}
	if (type == "") {
		$("#dvtype").addClass("error");
		$("#dvtype .help-inline").show().text("Please select degree type");
		chk = 1;
	}
	if (degreeOverview == "") {
		$("#dvdegreeOverview").addClass("error");
		$("#dvdegreeOverview .help-inline").show().text("Please enter degree importance/overview");
		chk = 1;
	}
	if (degreeContent == "") {
		$("#dvdegreeContent").addClass("error");
		$("#dvdegreeContent .help-inline").show().text("Please enter degree content");
		chk = 1;
	}
	if (totalNumberCourses == "") {
		$("#dvtotalNumberCourses").addClass("error");
		$("#dvtotalNumberCourses .help-inline").show().text("Please enter total number of courses");
		chk = 1;
	}
	if (course == "") {
		$("#dvcourse").addClass("error");
		$("#dvcourse .help-inline").show().text("Please enter course name");
		chk = 1;
	}
	if (totalCourses == "") {
		$("#dvtotalCourses").addClass("error");
		$("#dvtotalCourses .help-inline").show().text("Please enter total number of online courses");
		chk = 1;
	}
	if (online == "") {
		$("#dvonline").addClass("error");
		$("#dvonline .help-inline").show().text("Please enter online course name");
		chk = 1;
	}
	if (offlinetotal == "") {
		$("#dvofflinetotal").addClass("error");
		$("#dvofflinetotal .help-inline").show().text("Please enter total number of offline courses");
		chk = 1;
	}
	if (offline == "") {
		$("#dvoffline").addClass("error");
		$("#dvoffline .help-inline").show().text("Please enter offline course name");
		chk = 1;
	}
	if (facultyName == "") {
		$("#dvfacultyName").addClass("error");
		$("#dvfacultyName .help-inline").show().text("Please enter faculty name");
		chk = 1;
	}
	var imgmsg = CheckImages();
	if (imgmsg!="" && imgmsg!=null) {
		$("#dvfacultyResume").addClass("error");
		$("#dvfacultyResume .help-inline").show().html(imgmsg);
		chk = 1;
	}
	// if (facultyResume == "") {
	// 	$("#dvfacultyResume").addClass("error");
	// 	$("#dvfacultyResume .help-inline").show().text("Please enter faculty resume");
	// 	chk = 1;
	// }
	if (courseLanguage == "") {
		$("#dvcourseLanguage").addClass("error");
		$("#dvcourseLanguage .help-inline").show().text("Please select Language");
		chk = 1;
	}
	if (courseCountry == "") {
		$("#dvcourseCountry").addClass("error");
		$("#dvcourseCountry .help-inline").show().text("Please select course country");
		chk = 1;
	}
	if (courseCity == "") {
		$("#dvcourseCity").addClass("error");
		$("#dvcourseCity .help-inline").show().text("Please enter course city");
		chk = 1;
	}
	if (compulsory == "") {
		$("#dvcompulsory").addClass("error");
		$("#dvcompulsory .help-inline").show().text("Please enter compulsory subjects");
		chk = 1;
	}
	if (optional == "") {
		$("#dvoptional").addClass("error");
		$("#dvoptional .help-inline").show().text("Please enter optional subjects");
		chk = 1;
	}
	if (courseOfferingInstitute == "") {
		$("#dvcourseOfferingInstitute").addClass("error");
		$("#dvcourseOfferingInstitute .help-inline").show().text("Please enter degree offering institute");
		chk = 1;
	}
	if (instituteWebAddress == "") {
		$("#dvinstituteWebAddress").addClass("error");
		$("#dvinstituteWebAddress .help-inline").show().text("Please enter institue web address");
		chk = 1;
	}
	if (instituteDetails == "") {
		$("#dvinstituteDetails").addClass("error");
		$("#dvinstituteDetails .help-inline").show().text("Please enter institute details");
		chk = 1;
	}
	if (medium == "") {
		$("#dvmedium").addClass("error");
		$("#dvmedium .help-inline").show().text("Please enter teaching medium institute");
		chk = 1;
	}
	if (mediumWebAddress == "") {
		$("#dvmediumWebAddress").addClass("error");
		$("#dvmediumWebAddress .help-inline").show().text("Please enter teaching medium institue web address");
		chk = 1;
	}
	if (mediumDetails == "") {
		$("#dvmediumDetails").addClass("error");
		$("#dvmediumDetails .help-inline").show().text("Please enter teaching institute details");
		chk = 1;
	}
	if (duration == "") {
		$("#dvduration").addClass("error");
		$("#dvduration .help-inline").show().text("Please enter duration");
		chk = 1;
	}
	if (durationFor == "") {
		$("#dvdurationFor").addClass("error");
		$("#dvdurationFor .help-inline").show().text("Please select duration for");
		chk = 1;
	}
	if (hoursPerWeek == "") {
		$("#dvhoursPerWeek").addClass("error");
		$("#dvhoursPerWeek .help-inline").show().text("Please enter hours per week");
		chk = 1;
	}
	if (totalCost == "") {
		$("#dvtotalCost").addClass("error");
		$("#dvtotalCost .help-inline").show().text("Please enter total cost");
		chk = 1;
	}
	if (currency == "") {
		$("#dvcurrency").addClass("error");
		$("#dvcurrency .help-inline").show().text("Please select currency");
		chk = 1;
	}
	if (breakDown == "") {
		$("#dvbreakDown").addClass("error");
		$("#dvbreakDown .help-inline").show().text("Please enter cost breakdown");
		chk = 1;
	}
	if ($('input[name="financialAid"]:checked').length == 0) {
	//if (financialAid == "") {
		$("#dvfinancialAid").addClass("error");
		$("#dvfinancialAid .help-inline").show().text("Please select financial aid");
		chk = 1;
	}
	if (financialAidDetails == "") {
		$("#dvfinancialAidDetails").addClass("error");
		$("#dvfinancialAidDetails .help-inline").show().text("Please enter financial aid details");
		chk = 1;
	}
	if (startingDate == "") {
		$("#dvstartingDate").addClass("error");
		$("#dvstartingDate .help-inline").show().text("Please enter starting date");
		chk = 1;
	}
	if (endingDate == "") {
		$("#dvendingDate").addClass("error");
		$("#dvendingDate .help-inline").show().text("Please enter application deadline");
		chk = 1;
	}
	if (status == "") {
		$("#dvstatus").addClass("error");
		$("#dvstatus .help-inline").show().text("Please select status");
		chk = 1;
	}
	
	console.log(chk);

	if (chk==1) {
		return false;
	}
	else {
		return true;
	}
}

// $(document).ready(function(){
//     var x = 1;
// 	var maxField = 10; //Input fields increment limitation
//     var addButton = $('.add_button'); //Add button selector
//     var wrapper = $('.field_wrapper'); //Input field wrapper
//     var fieldHTML = '<div><input type="text" name="field_name" value=""/><a href="javascript:void(0);" class="remove_button">remove</a></div>'; //New input field html 
//      //Initial field counter is 1
    
//     //Once add button is clicked
//     $(addButton).click(function(){
//         //Check maximum number of input fields
//         if(x < maxField){ 
//             x++; //Increment field counter
//             $(wrapper).append(fieldHTML); //Add field html
//         }
//     });
    
//     //Once remove button is clicked
//     $(wrapper).on('click', '.remove_button', function(e){
//         e.preventDefault();
//         $(this).parent('div').remove(); //Remove field html
//         x--; //Decrement field counter
//     });
// });
