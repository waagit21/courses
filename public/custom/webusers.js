var oTable = $('#webusers').dataTable();
jQuery('#webusers_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
jQuery('#webusers_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

	//var oTable = $('#webusers').dataTable({
		//"bSort" : false,
	//});

	$('#webusers a.suspend').live('click', function (e) {
		e.preventDefault();
		if (confirm("Are you sure to block this user?") == false) {
			return;
		}
		var $link = $(this);
		var uid = $(this).closest('tr').attr('data-uid');
		$.ajax({
			url:'api/webblk/' + uid,
			type:"GET",
			dataType:"json",
			success: function (result,status,xhr) {
				if (result != null && result.success==true && result.data>0) {
					$link.html("<span class='label label-warning'>Suspended</span>");
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
	$('#webusers a.resume').live('click', function (e) {
		e.preventDefault();
		if (confirm("Are you sure to resume this user?") == false) {
			return;
		}
		var $link = $(this);
		var uid = $(this).closest('tr').attr('data-uid');
		$.ajax({
			url:'api/webrsm/' + uid,
			type:"GET",
			dataType:"json",
			success: function (result,status,xhr) {
				if (result != null && result.success==true && result.data>0) {
					$link.html("<span class='label label-success'>Approved</span>");
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