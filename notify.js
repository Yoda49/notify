// #################################################
// Simple and pretty notification messages. v. 0.0.1
// Author: Yoda
// Email: upv@bk.ru
// #################################################

var notify = 
{
	busy: false,
	ajax: false,
	
	// ====================================================
	// INIT
	// ====================================================
	init: function ()
	{
		var insert = "";
		insert += "<DIV ID='alert'>";
		insert += "		<CENTER>";
		insert += "		<IMG ID='alert_icon' SRC='/images/notify.png' STYLE='width: 60px;'><BR>";
		insert += "		<DIV ID='alert_title'></DIV><BR>";
		insert += "		<DIV ID='alert_body'></DIV><BR>";
		insert += "		<INPUT ID='alert_input'><BR>";
		insert += "		<DIV ID='alert_cancel'  CLASS='alert_button'>ОТМЕНА</DIV>";
		insert += "		<DIV ID='alert_user_fn' CLASS='alert_button'></DIV>";
		insert += "		<DIV ID='alert_confirm' CLASS='alert_button'>OK</DIV>";
		insert += "		</CENTER>";
		insert += "</DIV>";
		$("html").append(insert);
	},
	
	// ====================================================
	// MAIN FUNCTION 
	// ====================================================
	show: function (options)
	{
		// CHECK FOR BUSY
		if (this.busy == false) 
		{
			this.busy = true;
		}
		else 
		{
			if (notify.ajax == false) return;
			
			// if we need to close ajax window and show result of ajax
			//$("body").css({"background":"white","opacity":"1.0"});
			//$("#alert").fadeOut();
			notify.ajax = false;
			$("#alert_confirm").html("OK");
			$("#alert_cancel" ).html("ОТМЕНА");
			$("#alert_user_fn").html("");
		}
		
		// Clear buttons handlers.
		$("#alert_cancel" ).off("click");
		$("#alert_confirm").off("click");
		$("#alert_user_fn").off("click");
		
		// Clear input value.
		$("#alert_input").val("");
		
		if (options.delay == undefined) options.delay = 0;
		setTimeout(show_main, options.delay);

		function show_main ()
		{
			// Show or hide buttons.
			if (options.showCancelButton  == true ) $("#alert_cancel" ).css("display", "inline-block"); else $("#alert_cancel" ).css("display", "none");
			if (options.showConfirmButton == false) $("#alert_confirm").css("display", "none"); else $("#alert_confirm").css("display", "inline-block");
			if (options.showUserFnButton  == true ) $("#alert_user_fn").css("display", "inline-block"); else $("#alert_user_fn").css("display", "none");
			
			// CHANGE ICON
			if (options.type != undefined)
			{
				if (options.type == "error"  ) $("#alert_icon").attr("SRC","/images/error.png"  );
				if (options.type == "warning") $("#alert_icon").attr("SRC","/images/warning.png");
				if (options.type == "confirm") $("#alert_icon").attr("SRC","/images/confirm.png");
				if (options.type == "notify" ) $("#alert_icon").attr("SRC","/images/notify.png" );
			}
			else 
			{
				$("#alert_icon").attr("SRC","/images/notify.png");
			}
			
			// SHOW TITLE
			if (options.title != undefined) $("#alert_title").html(options.title); else $("#alert_title").html("");
			
			// SHOW BODY
			if (options.body != undefined) $("#alert_body").html(options.body); else $("#alert_body").html("");
			
			// SHOW INPUT 
			if (options.input != undefined) $("#alert_input").show(); else $("#alert_input").hide();
			if (options.inputPlaceholder != undefined) $("#alert_input").attr("PLACEHOLDER", options.inputPlaceholder);
			
			// CONFIRM BUTTON TEXT
			if (options.confirmButtonText != undefined) $("#alert_confirm").html(options.confirmButtonText); else $("#alert_confirm").html("OK");
			
			// CANCEL BUTTON TEXT
			if (options.cancelButtonText != undefined) $("#alert_cancel" ).html(options.cancelButtonText); else $("#alert_cancel").html("ОТМЕНА");
			
			// USER BUTTON TEXT
			if (options.userButtonText != undefined) $("#alert_user_fn" ).html(options.userButtonText); else $("#alert_user_fn").html("");
		
			// Calc left margin of notify window.
			var left = $("#alert").css("width");
			left = parseInt(left.substring(0, left.length - 2)) / 2 + 17;
			$("#alert").css("left", "calc(50% - " + left + "px)");
			
			// Fading background.
			$("body").css({"background":"#445566","opacity":"0.4"});
			$("#alert").fadeIn(500);
			
			// Handler for cancel button.
			$("#alert_cancel").click(function()
			{
				$("body").css({"background":"white","opacity":"1.0"});
				$("#alert").fadeOut();
				notify.busy = false;
				
				if (options.cancelFunction != undefined)
				{
					if (options.input == true) options.cancelFunction($("#alert_input").val()); else options.cancelFunction();
				}
			});
			
			// Handler for confirm button.
			$("#alert_confirm").click(function()
			{
				// if window closing
				if (options.closeOnConfirm == undefined || options.closeOnConfirm == true) 
				{
					$("body").css({"background":"white","opacity":"1.0"});
					$("#alert").fadeOut();
					notify.busy = false;
				}
				// without window closing
				else
				{
					notify.ajax = true;
					$("#alert_confirm").html("<IMG SRC='/images/alert_loader.gif'>");
					$("#alert_cancel" ).off("click");
					$("#alert_confirm").off("click");
					$("#alert_user_fn").off("click");
				}
				
				if (options.confirmFunction != undefined)
				{
					if (options.input == true) options.confirmFunction($("#alert_input").val()); else options.confirmFunction();
				}
			});
			
			// Handler for user button.
			$("#alert_user_fn").click(function()
			{
				$("body").css({"background":"white","opacity":"1.0"});
				$("#alert").fadeOut();
				notify.busy = false;
				
				if (options.userFunction != undefined)
				{
					if (options.input == true) options.userFunction($("#alert_input").val()); else options.userFunction();
				}
			});
			
			// Launch special user function after window load completed.
			if (options.afterShowFunction != undefined) options.afterShowFunction ();
		}
	},
	
	//===========================================
	// CLOSE WINDOW
	//===========================================
	close: function ()
	{
		$("body").css({"background":"white","opacity":"1.0"});
		$("#alert").fadeOut();
		notify.busy = false;
	}
}

notify.init();