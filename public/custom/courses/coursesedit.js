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

	$('#courseBreakDown').bind('input propertychange', function() { CharLimit(this, 100, 1); }).trigger('propertychange');
	$('#instituteDetails').bind('input propertychange', function() { CharLimit(this, 100, 2); }).trigger('propertychange');
	$('#mediumDetails').bind('input propertychange', function() { CharLimit(this, 100, 3); }).trigger('propertychange');

	$("#partinfo").hide();

	$("#part").change(function(){
		if(this.value=="Yes"){
			$("#partinfo").show();
		}
		else{
			$("#partinfo").hide();
		}
	}).change();

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

function CharLimit(input, maxChar, val) {
    var len = $(input).val().length;	
	$('#textCounter' + val).text(len + '/' + maxChar);
	if (len > maxChar-1) {
        $(input).val($(input).val().substring(0, maxChar));
		$('#textCounter' + val).text(maxChar + '/' + maxChar);
    }
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
	//var mode = $("#mode").val();
	var facultyName = $("#facultyName").val();
	//var facultyResume = $("#facultyResume").val();
	var courseLanguage = $("#courseLanguage").val();
	var courseBreakDown = $("#courseBreakDown").val();
	var courseCountry = $("#courseCountry").val();
	var courseCity = $("#courseCity").val();
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
	var part = $("#part").val();
	var programSpecs = $("#programSpecs").val();
	var programName = $("#programName").val();
	var programType = $("#programType").val();
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
	if ($('input[name="financialAid"]:checked').length == 0) {
	//if (mode == "") {
		$("#dvmode").addClass("error");
		$("#dvmode .help-inline").show().text("Please select mode");
		chk = 1;
	}
	if(dataid!=null && dataid!=""){
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
	}
	// if (facultyResume == "") {
	// 	$("#dvfacultyResume").addClass("error");
	// 	$("#dvfacultyResume .help-inline").show().text("Please enter faculty resume");
	// 	chk = 1;
	// }
	if (courseLanguage == "") {
		$("#dvcourseLanguage").addClass("error");
		$("#dvcourseLanguage .help-inline").show().text("Please select language");
		chk = 1;
	}
	if (courseBreakDown == "") {
		$("#dvcourseBreakDown").addClass("error");
		$("#dvcourseBreakDown .help-inline").show().text("Please enter importance, breakdown");
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
	if (courseOfferingInstitute == "") {
		$("#dvcourseOfferingInstitute").addClass("error");
		$("#dvcourseOfferingInstitute .help-inline").show().text("Please enter course offering institute");
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
	if (part == "") {
		$("#dvpart").addClass("error");
		$("#dvpart .help-inline").show().text("Please select part");
		chk = 1;
	}
	if(part=="Yes"){
		if (programSpecs == "") {
			$("#dvprogramSpecs").addClass("error");
			$("#dvprogramSpecs .help-inline").show().text("Please enter program specification");
			chk = 1;
		}
		if (programName == "") {
			$("#dvprogramName").addClass("error");
			$("#dvprogramName .help-inline").show().text("Please enter program name");
			chk = 1;
		}
		if (programType == "") {
			$("#dvprogramType").addClass("error");
			$("#dvprogramType .help-inline").show().text("Please enter program type");
			chk = 1;
		}
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