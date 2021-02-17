
var oTable = $('#institutes').DataTable( {"sPaginationType": "full_numbers"} );
//var oTable = $('#institutes').DataTable();
// var oTable =$('#institutes').dataTable({
// 	"sPaginationType": "full_numbers"
// 	})
//   .columnFilter({sPlaceHolder: "head:before",
// 	aoColumns: [{type: "text" },{type: "text" },{type: "text" },{type: "text" },{type: "text" },{type: "text" }]
//   });
jQuery('#institutes_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
jQuery('#institutes_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown
oTable.fnSetColumnVis( 0, false, false );

function GetMore() {

	var counter = 1;
	$.ajax({
		type: "GET",
		async: false,
		dataType:"json", // <-- I use plain text cause the reals rows have got a lot of input select and this way is more simple than others
		url: "api/getinstitutes",
		success: function(data) {
			console.log(data.data);
			// oTable.rows.add(data.data).draw( false );
			$.each(data.data, function (i, obj) {
				var rowIndex =  oTable.fnAddData( [
					i+4,
					data.data[i].instituteName,
					data.data[i].instituteType,
					data.data[i].institutionMode,
					data.data[i].creation_date,
					'<a href="" class="suspend" data-toggle="tooltip" title="Approved">><span class="label label-success"><i class="fa fa-check" aria-hidden="true"></i></span></a>',
					'',
				] );
				var row = oTable.fnGetNodes(rowIndex);
				$(row).attr('data-uid', data.data[i]._id);
				//$(row).addClass("editable");
				$('td:eq(1),td:eq(2),td:eq(3)', row).addClass("hidden-480");				
			});			
			// for (i = 0; i < datadata.length; i++) {
			// }			
		}
	});
}

$('#institutes a.delete').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to delete this?") == false) {
		return;
	}
	var nRow = $(this).parents('tr')[0];
	var delid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/insdel/' + delid,
		type:"GET",
		dataType:"json",
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				oTable.fnDeleteRow(nRow);
				$('#suc_msg').parents().removeClass('hide');
				$('#suc_msg').text("Removed Successfully");
			}
			else {
				$('#err_msg').parents().removeClass('hide');
				$('#err_msg').text("User Not Removed");
				if(result == "-1"){
					$('#err_msg').text("Course cannot be deleted");
				}
			}
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Not Removed");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
});
$('#institutes a.suspend').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to block this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/insblk/' + uid,
		type:"GET",
		dataType:"json",
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				$link.html("<span class='label label-warning'><i class='fa fa-pause' aria-hidden='true'></i></span>");
				$link.closest('a').removeClass('suspend').addClass('resume');
				$('#suc_msg').parents().removeClass('hide');
				$('#suc_msg').text("Blocked Successfully");
			}
			else {
				$('#err_msg').parents().removeClass('hide');
				$('#err_msg').text("User Not Blocked");
			}
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Not Blocked");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
});
$('#institutes a.resume').live('click', function (e) {
	e.preventDefault();
	if (confirm("Are you sure to resume this user?") == false) {
		return;
	}
	var $link = $(this);
	var uid = $(this).closest('tr').attr('data-uid');
	$.ajax({
		url:'api/insrsm/' + uid,
		type:"GET",
		dataType:"json",
		success: function (result,status,xhr) {
			if (result != null && result.success==true && result.data>0) {
				$link.html("<span class='label label-success'><i class='fa fa-check' aria-hidden='true'></i></span>");
				$link.closest('a').removeClass('resume').addClass('suspend');
				$('#suc_msg').parents().removeClass('hide');
				$('#suc_msg').text("Resumed Successfully");
			}
			else {
				$('#err_msg').parents().removeClass('hide');
				$('#err_msg').text("User Not Resumed");
			}
		},
		error: function (request, status, error) {
			$('#err_msg').parents().removeClass('hide');
			$('#err_msg').text("Error, User Not Resumed");
			console.log("error");
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
});

// $(document).ready(function(){
// 	var category_id = 0 ;
// 	$("#category").change(function(){
// 		var idx = arr_category.map(function(o) { return o.id; }).indexOf(this.value);
// 		category_id = arr_category[idx]['category_id'];
// 		$("#category_id").val(category_id);
// 		if(category_id==1) {
// 			$("#dgedsp").hide();
// 			$("#crsdsp").show();
// 			$("#istdsp").show();
// 		}
// 		else if(category_id==2) {
// 			$("#crsdsp").hide();
// 			$("#istdsp").hide();
// 			$("#dgedsp").show();
// 		}
// 		else {
// 			$("#dgedsp").hide();
// 			$("#istdsp").show();
// 			$("#crsdsp").show();
// 		}
// 	});
// 	var crs = getParameterByName('crs');
// 	if(crs!=null && crs!="" && isInt(crs)) {
// 		var idx = arr_category.map(function(o) { return o.id; }).indexOf($("#category").val());
// 		category_id = arr_category[idx]['category_id'];
// 		$("#category_id").val(category_id);
// 		if(category_id==1) {
// 			$("#dgedsp").hide();
// 			$("#crsdsp").show();
// 			$("#istdsp").show();
// 		}
// 		else if(category_id==2) {
// 			$("#crsdsp").hide();
// 			$("#istdsp").hide();
// 			$("#dgedsp").show();
// 		}
// 		else {
// 			$("#dgedsp").hide();
// 			$("#istdsp").show();
// 			$("#crsdsp").show();
// 		}
// 	}
// 	$('#start').datepicker({
// 		format: 'yyyy/mm/dd',
// 		inline: true,
// 		firstDay: 1,
// 		showOtherMonths: true,
// 		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// 	});
// 	$('#last').datepicker({
// 		format: 'yyyy/mm/dd',
// 		inline: true,
// 		firstDay: 1,
// 		showOtherMonths: true,
// 		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// 	});

// 	$(".usrchng").live("blur", function(){
// 		var id = $(this).attr('id');
// 		$("#dv"+id).removeClass("error");
// 		$("#dv"+id+" .help-inline").hide().text("");
// 	});
// 	$(".modechng").live("blur", function(){
// 		$("#dvmode").removeClass("error");
// 		$("#dvmode .help-inline").hide().text("");
// 	});
// });

// function ValidateCourse(){	

// 	var chk=0;
// 	var category_id = $("#category_id").val();
// 	$(".help-inline").hide().text("");
// 	$(".control-group").removeClass("error");
	
// 	var category = $("#category").val();
// 	var name = $("#name").val();
// 	var overview = $("#overview").val();
// 	var content = $("#content").val();
// 	var teacher = $("#teacher").val();
// 	//var mode = $("#mode").val();
// 	var faculty = $("#faculty").val();
// 	var total = $("#total").val();
// 	var online = $("#online").val();
// 	var info = $("#info").val();
// 	var subject = $("#subject").val();
// 	var country = $("#country").val();
// 	var language = $("#language").val();
// 	var institute = $("#institute").val();
// 	var institute_web = $("#institute_web").val();
// 	var medium = $("#medium").val();
// 	var medium_web = $("#medium_web").val();
// 	var instructor = $('input[name="instructor"]:checked').val();
// 	var duration = $("#duration").val();
// 	var duration_for = $("#duration_for").val();
// 	var hours = $("#hours").val();
// 	var cost = $("#cost").val();
// 	var currency = $("#currency").val();
// 	var break_down = $("#break_down").val();
// 	var aid = $('input[name="aid"]:checked').val();
// 	var aid_detail = $("#aid_detail").val();
// 	var start = $("#start").val();
// 	var last = $("#last").val();
	
// 	if (category == "") {
// 		//$("#err_category").text("Please select category.");
// 		$("#dvcategory").addClass("error");
// 		$("#dvcategory .help-inline").show().text("Please select category.");
// 		chk = 1;
// 	}
// 	if (name == "") {
// 		$("#dvname").addClass("error");
// 		$("#dvname .help-inline").show().text("Please enter name.");
// 		chk = 1;
// 	}
// 	else if (ValidText(name,0,255)) {
// 		$("#dvname").addClass("error");
// 		$("#dvname .help-inline").show().text("250 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (overview == "") {
// 		$("#dvoverview").addClass("error");
// 		$("#dvoverview .help-inline").show().text("Please enter overview.");
// 		chk = 1;
// 	}
// 	if(category_id == 1) {
// 		if (content == "") {
// 			$("#dvcontent").addClass("error");
// 			$("#dvcontent .help-inline").show().text("Please enter content.");
// 			chk = 1;
// 		}
// 		if (teacher == "") {
// 			$("#dvteacher").addClass("error");
// 			$("#dvteacher .help-inline").show().text("Please enter teacher detail.");
// 			chk = 1;
// 		}
// 		var mode = $('input:checkbox').is(':checked');
// 		if (mode == false) {
// 			$("#dvmode").addClass("error");
// 			$("#dvmode .help-inline").show().text("Please enter mode.");
// 			chk = 1;
// 		}
// 		if (instructor == undefined) {
// 			$("#dvinstructor").addClass("error");
// 			$("#dvinstructor .help-inline").show().text("Please enter instructor.");
// 			chk = 1;
// 		}
// 	}
// 	if(category_id == 2) {
// 		if (faculty == "") {
// 			$("#dvfaculty").addClass("error");
// 			$("#dvfaculty .help-inline").show().text("Please enter faculty.");
// 			chk = 1;
// 		}
// 		if (total == "") {
// 			$("#dvtotal").addClass("error");
// 			$("#dvtotal .help-inline").show().text("Please enter total.");
// 			chk = 1;
// 		}
// 		else if (total < 0) {
// 			$("#dvtotal").addClass("error");
// 			$("#dvtotal .help-inline").show().text("Invalid value.");
// 			chk = 1;
// 		}
// 		if (online == "") {
// 			$("#dvonline").addClass("error");
// 			$("#dvonline .help-inline").show().text("Please enter online courses.");
// 			chk = 1;
// 		}
// 		if (online < 0) {
// 			$("#dvonline").addClass("error");
// 			$("#dvonline .help-inline").show().text("Invalid value.");
// 			chk = 1;
// 		}
// 		if (online > total) {
// 			$("#dvonline").addClass("error");
// 			$("#dvonline .help-inline").show().text("Online cannnot be greater then total.");
// 			chk = 1;
// 		}
// 	}
// 	if (info == "") {
// 		$("#dvinfo").addClass("error");
// 		$("#dvinfo .help-inline").show().text("Please enter course info.");
// 		chk = 1;
// 	}
// 	if (subject == "") {
// 		$("#dvsubject").addClass("error");
// 		$("#dvsubject .help-inline").show().text("Please enter subject.");
// 		chk = 1;
// 	}
// 	if (country == "") {
// 		$("#dvcountry").addClass("error");
// 		$("#dvcountry .help-inline").show().text("Please enter country.");
// 		chk = 1;
// 	}
// 	if (language == "") {
// 		$("#dvlanguage").addClass("error");
// 		$("#dvlanguage .help-inline").show().text("Please enter language.");
// 		chk = 1;
// 	}
// 	if (institute == "") {
// 		$("#dvinstitute").addClass("error");
// 		$("#dvinstitute .help-inline").show().text("Please enter institute.");
// 		chk = 1;
// 	}
// 	else if (ValidText(institute,0,255)) {
// 		$("#dvinstitute").addClass("error");
// 		$("#dvinstitute .help-inline").show().text("250 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (institute_web == "") {
// 		$("#dvinstitute_web").addClass("error");
// 		$("#dvinstitute_web .help-inline").show().text("Please enter institute web.");
// 		chk = 1;
// 	}
// 	else if (ValidText(institute_web,0,500)) {
// 		$("#dvinstitute_web").addClass("error");
// 		$("#dvinstitute_web .help-inline").show().text("500 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (medium == "") {
// 		$("#dvmedium").addClass("error");
// 		$("#dvmedium .help-inline").show().text("Please enter medium.");
// 		chk = 1;
// 	}
// 	else if (ValidText(medium,0,255)) {
// 		$("#dvmedium").addClass("error");
// 		$("#dvmedium .help-inline").show().text("250 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (medium_web == "") {
// 		$("#dvmedium_web").addClass("error");
// 		$("#dvmedium_web .help-inline").show().text("Please enter medium web.");
// 		chk = 1;
// 	}
// 	else if (ValidText(medium_web,0,500)) {
// 		$("#dvmedium_web").addClass("error");
// 		$("#dvmedium_web .help-inline").show().text("500 Characters allowed.");
// 		chk = 1;
// 	}
// 	if (duration == "") {
// 		$("#dvduration").addClass("error");
// 		$("#dvduration .help-inline").show().text("Please enter duration.");
// 		chk = 1;
// 	}
// 	else if (duration < 0) {
// 		$("#dvduration").addClass("error");
// 		$("#dvduration .help-inline").show().text("Invalid value.");
// 		chk = 1;
// 	}
// 	if (duration_for == "") {
// 		$("#dvduration_for").addClass("error");
// 		$("#dvduration_for .help-inline").show().text("Please enter duration for.");
// 		chk = 1;
// 	}
// 	if (hours == "") {
// 		$("#dvhours").addClass("error");
// 		$("#dvhours .help-inline").show().text("Please enter hours.");
// 		chk = 1;
// 	}
// 	else if (hours < 0) {
// 		$("#dvhours").addClass("error");
// 		$("#dvhours .help-inline").show().text("Invalid value.");
// 		chk = 1;
// 	}
// 	if (cost == "") {
// 		$("#dvcost").addClass("error");
// 		$("#dvcost .help-inline").show().text("Please enter cost.");
// 		chk = 1;
// 	}
// 	else if (cost < 0) {
// 		$("#dvcost").addClass("error");
// 		$("#dvcost .help-inline").show().text("Invalid value.");
// 		chk = 1;
// 	}
// 	if (currency == "") {
// 		$("#dvcurrency").addClass("error");
// 		$("#dvcurrency .help-inline").show().text("Please enter currency.");
// 		chk = 1;
// 	}
// 	if (break_down == "") {
// 		$("#dvbreak_down").addClass("error");
// 		$("#dvbreak_down .help-inline").show().text("Please enter break down.");
// 		chk = 1;
// 	}
// 	//if ($('input[name="aid"]:checked').length == 0) {
// 	if (aid == undefined) {
// 		$("#dvaid").addClass("error");
// 		$("#dvaid .help-inline").show().text("Please select aid.");
// 		chk = 1;
//     }
// 	else if (aid == "Yes") {
// 		if (aid_detail == "") {
// 			$("#dvaid_detail").addClass("error");
// 			$("#dvaid_detail .help-inline").show().text("Please enter aid detail.");
// 			chk = 1;
// 		}
// 		else if (ValidText(aid_detail,0,500)) {
// 			$("#dvaid_detail").addClass("error");
// 			$("#dvaid_detail .help-inline").show().text("500 Characters allowed.");
// 			chk = 1;
// 		}
// 	}	
// 	if (start == "") {
// 		$("#dvstart").addClass("error");
// 		$("#dvstart .help-inline").show().text("Please select start date.");
// 		chk = 1;
// 	}
// 	if (last == "") {
// 		$("#dvlast").addClass("error");
// 		$("#dvlast .help-inline").show().text("Please select last date.");
// 		chk = 1;
// 	}

// 	if (chk==1) {
// 		return false;
// 	}
// 	else {
// 		return true;
// 	}
// }

// function ValidText(text,mini,maxi) {
// 	if (text != '' && text != null) {
// 		var strlen = text.length;
// 		if (strlen < mini || strlen > maxi) {
// 			return true;
// 		}
// 		else {
// 			return false;
// 		}
// 	}
// 	else {
// 		return true;
// 	}
// }

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }
// function isInt(value) {
//   return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
// }