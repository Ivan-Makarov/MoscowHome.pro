function isValidEmailAddress(emailAddress){
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}
function editInputDialog(object,checkEmpty){
	var type = object.parent().attr("data-type");
	var val = object.val();
	var validation = "";
	if (val=="" && checkEmpty == false){
		validation = "empty";
	}
	else{
		switch(type){
			case 'text':
				validation = "error";
				if (val.length > 1){
					validation = "ok";
				}
			break;
			case 'email':
				validation = "error";
				if (isValidEmailAddress(val)){
					validation = "ok";
				}
			break;
			case 'phone':
				validation = "error";
				if(object.inputmask("isComplete")){
					validation = "ok";
				}
			break;
		}
	}
	console.log(type+" "+validation);
	object.parent().attr("data-validation",validation);
	
	var validation_status = "ok";
	object.closest(".dialog,.dialog_mobile").find("input").each(function(){
		if ($(this).parent().attr("data-validation") == undefined || $(this).parent().attr("data-validation")=="" || $(this).parent().attr("data-validation")=="error"){
			validation_status = "error";
			return;
		}
	});
	
	var submit = object.closest(".dialog,.dialog_mobile").find(".submit_button");
	if (validation_status != "error"){
		//submit.attr("data-access","true");
		submit.removeClass("disabled");
	}
	else{
		//submit.attr("data-access","false");
		submit.addClass("disabled");
	}
}

var timeout;
var dialog;

$(document).ready(function(){
	
	$(".dialog .toggle_button").click(function(){
		$(this).toggleClass("active");
	});
	
	$(".dialog_input[data-type=phone] input").inputmask("+7 (999) 999-99-99");
	
	$(".dialog .close, .dialog .blackout").click(function(){
		$(this).closest(".dialog").removeClass("show");
	});
	
	$(".dialog_input input").keyup(function(){
		$(this).parent().attr("data-validation","");
	});
	$(".dialog_input input,.dialog_input textarea").change(function(){
		editInputDialog($(this),true);
	});
	$(".dialog_input input,.dialog_input textarea").keyup(function(){
		clearTimeout(timeout);
		timeout = setTimeout(function(object){
			editInputDialog(object,true);
		},700,$(this));
	});
	
	$(".dialog_input").click(function(){
		$(this).find("input").focus();
		$(this).find("textarea").focus();
	});
	$(".dialog_input input,.dialog_input textarea").change(function(){
		if ($(this).val() == ""){
			$(this).removeClass("no_empty");
		}
		else{
			$(this).addClass("no_empty");
		}
	});
	$(".dialog_input input,.dialog_input textarea").focus(function(){
		$(this).parent().addClass("selected");
	});
	$(".dialog_input input,.dialog_input textarea").bind("focusin focus",function(e){
		e.preventDefault();
	});
	$(".dialog_input input,.dialog_input textarea").blur(function(){
		$(this).parent().removeClass("selected");
	});
	$(".submit_button").click(function(){
		dialog = $(this).closest(".dialog");
		if ($(this).attr("data-access")=="true"){
			dialog.find(".preloader").fadeIn(300);
			dialog.find(".dialog_input").animate({opacity:0});
			
			var type = dialog.attr("data-dialog");
			var post = {"type":type};
			dialog.find("input,textarea").each(function(index){
				post[$(this).attr("name")] = $(this).val();
			});
			$.post("/order/",post,function(data){
				//if (data=="ok"){
					dialog.find(".ok_button").fadeIn(200);
					dialog.find(".submit_button").fadeOut(200);
					dialog.find(".close").fadeOut(200);
					dialog.find(".header").animate({opacity:0},function(){
						$(this).text("Заявка принята!");
						dialog.find(".header").animate({opacity:1});
						dialog.find(".sub_header").fadeIn(300);
					});
					dialog.find("input,textarea").val("");
					dialog.find("input,textarea").removeClass("no_empty");
					dialog.find(".dialog_input").attr("data-validation","");
					dialog.find(".preloader").fadeOut(300);
					dialog.addClass("success");
				//}
			});
		}
		else{
			dialog.find(".dialog_input input").each(function(){
				editInputDialog($(this),true);
			});
		}
	});
	$(".ok_button").click(function(){
		dialog = $(this).closest(".dialog");
		var type = dialog.attr("data-dialog");
		dialog.fadeOut(300,function(){
			dialog.find(".ok_button").hide();
			dialog.find(".submit_button").attr("data-access","false").show();
			dialog.find(".close").show();
			if (type == "order"){
				dialog.find(".header").text("Онлайн-заявка");
			}
			else{
				dialog.find(".header").text("Обратный звонок");
			}
			dialog.find(".sub_header").hide();
			dialog.removeClass("success");
			dialog.find(".dialog_input").css({opacity:1});
		});
	});
});