$(document).ready(function(){
	$(document).on("click",".layout_filter .filter_open",function(){
		$(".filter").addClass("opened");
	});
	$(document).on("click",".filter .filter_open",function(){
		$(".filter").removeClass("opened");
	});
});