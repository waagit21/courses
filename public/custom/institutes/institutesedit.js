$(document).ready(function() {
	var url_id= getParameterByName('id');
	if (url_id== null || url_id==""){
		$("#instituteType").prepend("<option value='' selected='selected'>Please Select</option>");
		$("#institutionMode").prepend("<option value='' selected='selected'>Please Select</option>");
	}

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
});



function RemoveSelect(id, val) {
	var first = $("#"+ id +" option:first").val();
	if(first==""){
		if(val!="" && val!=null){
			$("#" + id).find("option").eq(0).remove();
		} 
	}
}

function Validate() {
	var url_id= getParameterByName('id');
	var chk=0;
	$(".help-inline").hide().text("");
	$(".control-group").removeClass("error");
	
	var instituteName = $("#instituteName").val();
	var instituteType = $("#instituteType").val();
	var institutionMode = $("#institutionMode").val();
	var instituteWebAddress = $("#instituteWebAddress").val();
	var institutePhoneNumber = $("#institutePhoneNumber").val();
	var instituteWhatsAppNumber = $("#instituteWhatsAppNumber").val();
	var instituteEmail = $("#instituteEmail").val();
	var instituteAddress = $("#instituteAddress").val();
	var imageSet = $("#imageSet").val();
	var campuses = $("#campuses").val();
	var department = $("#department").val();
	var program = $("#program").val();
	var faculty = $("#faculty").val();
	var instituteFacilitation = $("#instituteFacilitation").val();
	var status = $("#status").val();
	
	if (instituteName == "") {
		$("#dvinstituteName").addClass("error");
		$("#dvinstituteName .help-inline").show().text("Please enter name");
		chk = 1;
	}
	if (instituteType == "") {
		$("#dvinstituteType").addClass("error");
		$("#dvinstituteType .help-inline").show().text("Please select type");
		chk = 1;
	}
	if (institutionMode == "") {
		$("#dvinstitutionMode").addClass("error");
		$("#dvinstitutionMode dvtype .help-inline").show().text("Please select mode");
		chk = 1;
	}
	if (instituteWebAddress == "") {
		$("#dvinstituteWebAddress").addClass("error");
		$("#dvinstituteWebAddress .help-inline").show().text("Please enter webaddress");
		chk = 1;
	}
	if (institutePhoneNumber == "") {
		$("#dvinstitutePhoneNumber").addClass("error");
		$("#dvinstitutePhoneNumber .help-inline").show().text("Please enter phone number");
		chk = 1;
	}
	if (instituteWhatsAppNumber == "") {
		$("#dvinstituteWhatsAppNumber").addClass("error");
		$("#dvinstituteWhatsAppNumber .help-inline").show().text("Please enter WhatsApp number");
		chk = 1;
	}
	if (instituteEmail == "") {
		$("#dvinstituteEmail").addClass("error");
		$("#dvinstituteEmail .help-inline").show().text("Please enter email");
		chk = 1;
	}
	if (instituteAddress == "") {
		$("#dvinstituteAddress").addClass("error");
		$("#dvinstituteAddress .help-inline").show().text("Please enter address");
		chk = 1;
	}
	if (imageSet == "") {
		$("#dvimageSet").addClass("error");
		$("#dvimageSet .help-inline").show().text("Please enter imageset");
		chk = 1;
	}
	if (campuses == "") {
		$("#dvcampuses").addClass("error");
		$("#dvcampuses .help-inline").show().text("Please enter campuses");
		chk = 1;
	}
	if (department == "") {
		$("#dvdepartment").addClass("error");
		$("#dvdepartment .help-inline").show().text("Please enter department");
		chk = 1;
	}
	if (program == "") {
		$("#dvprogram").addClass("error");
		$("#dvprogram .help-inline").show().text("Please enter program");
		chk = 1;
	}
	if (faculty == "") {
		$("#dvfaculty").addClass("error");
		$("#dvfaculty .help-inline").show().text("Please enter faculty");
		chk = 1;
	}
	if (instituteFacilitation == "") {
		$("#dvinstituteFacilitation").addClass("error");
		$("#dvinstituteFacilitation .help-inline").show().text("Please enter facilitation");
		chk = 1;
	}
	if (status == "") {
		$("#dvstatus").addClass("error");
		$("#dvstatus .help-inline").show().text("Please select status");
		chk = 1;
	}

	if (chk==1) {
		return false;
	}
	else {
		return true;
	}
}