$.fn.exists = function(callback) {
	var args = [].slice.call(arguments, 1);
	if (this.length) {
		callback.call(this, args);
	}
	return this;
};

function setArrow(object){
	var left = object.position().left + $('.menu').position().left + object.outerWidth()/2;
	$(".layout_podmenu").addClass("active");
	document.styleSheets[6].insertRule('.layout_podmenu:before{left: '+left+'px;}', document.styleSheets[6].cssRules.length);
	document.styleSheets[6].insertRule('.layout_podmenu:after{left: '+left+'px;}',document.styleSheets[6].cssRules.length);
}

var oldScroll = 0;
var current_podmenu;

$(document).ready(function(){
	
	current_podmenu = $('.layout_podmenu div.active');
	
	$(document).on("click","#callme",function(){
		if (device.mobile() || device.tablet()){
			$(this).toggleClass("open");
			$("html,body").animate({ scrollTop: $(this).offset().top}, 300);
		}
		else{
			$("[data-dialog='callme']").toggleClass("show");
		}
		
	});
	$(document).on("click","#order_same",function(){
		if (device.mobile() || device.tablet()){
			$(this).toggleClass("open");
			$("html,body").animate({ scrollTop: $(this).offset().top}, 300);
		}
		else{
			$("[data-dialog='order_presentation']").toggleClass("show");
		}
		
	});
	$(".category.active").exists(function(){
		setArrow($(".category.active"));
	});
	
	$('.menu a.category').mouseenter(function(){
		var category = $(this).attr("data-category");
		$(".layout_podmenu div").removeClass("active");
		$(".layout_podmenu div").css("z-index",1);
		if (category != ''){
			$(".category_"+category).addClass("active");
			$(".category_"+category).css("z-index",5);
		}
		setArrow($(this));
		
	});
	$('.menu a.category').mouseleave(function(e){
		var objectOut = $(e.relatedTarget);
		if (!objectOut.hasClass("layout_podmenu") && !objectOut.parent().parent().hasClass("layout_podmenu")){
			$(".layout_podmenu div").removeClass("active");
			$(".layout_podmenu").removeClass("active");
			
			if (current_podmenu.length > 0){
				current_podmenu.addClass("active");
				$(".layout_podmenu").addClass("active");
				setArrow($(".category.active"));
			}
		}
	});
	$('.hamburger').click(function(e){
		$(this).toggleClass("active");
		if ($(this).hasClass("active")){
			$(".menu_mobile").css({height:$(window).height() - 65});
			$(".menu_mobile").removeClass("hide");
		}
		else{
			$(".menu_mobile").addClass("hide");
			$(".menu_mobile").animate({height:0});
		}
	});
	if (device.mobile() || device.tablet()){
		$('.menu a.category').click(function(e){
			e.preventDefault();
			var category = $(this).attr("data-category");
			$(".layout_podmenu div").removeClass("active");
			$(".layout_podmenu div").css("z-index",1);
			if (category != ''){
				$(".category_"+category).addClass("active");
				$(".category_"+category).css("z-index",5);
			}
			setArrow($(this));
			
			return false;
		});
		$('.menu_mobile a.category_mobile').click(function(e){
			e.preventDefault();
			$(this).toggleClass("active");
			return false;
		});
	}
	$('.layout_podmenu').mouseleave(function(){
		$(".layout_podmenu div").removeClass("active");
		$(".layout_podmenu").removeClass("active");
		
		if (current_podmenu.length > 0){
			current_podmenu.addClass("active");
			$(".layout_podmenu").addClass("active");
		}
	});
	
	$("input.input__field").focus(function(){
		$(this).addClass('input--filled');
	});
	$("input.input__field").blur(function(){
		if($(this).val().trim() === '' ) {
			$(this).removeClass('input--filled');
		}
	});
	$(".carousel_service").exists(function(){
		if (!device.mobile() && !device.tablet()){
			$('.carousel_service .jcarousel').jcarousel({
				wrap: 'circular'
			});
			$('.carousel_service .jcarousel').jcarousel('scroll', '0');
		}
	});
	$(document).on("click",".column_item .item_content .arrow, .layout_service .service_top .arrow",function(){
		$(this).parent().toggleClass("opened");
	});
	$(document).on("click",".service_navigation .navigation_left",function(){
		$(this).closest(".service_item").find(".jcarousel").jcarousel('scroll', '-=1');
	});
	$(document).on("click",".service_navigation .navigation_right",function(){
		$(this).closest(".service_item").find(".jcarousel").jcarousel('scroll', '+=1');
	});
	$(document).on("click",".spoiler",function(){
		if ($(this).hasClass("opened")){
			$(this).removeClass("opened");
		}
		else{
			$(this).addClass("opened");
		}
	});

	$(".lightgallery").lightGallery({selector:'a'}); 
	
	
	setTimeout(function(){$('body').css('padding-top',$(".top").outerHeight())},200);
});
$(window).scroll(function () {
	
	var currentScroll = $(window).scrollTop();
	var delta = oldScroll - currentScroll;
	
	
	var top = $(".top");
	var menu = $(".top .menu");
	if (!$(".layout_podmenu").hasClass("active")){
		menu.css({'border-bottom':'1px solid #e3e3e3'});
	}
	if (currentScroll > top.outerHeight()){
		top.addClass('scrolled');
		if (delta > 0){
			top.addClass('show');
		}
		if (delta < 0){
			top.removeClass('show');
			$('.hamburger').removeClass("active");
			$(".menu_mobile").addClass("hide");
		}
	}
	else{
	}
	if (currentScroll == 0){
		top.removeClass('scrolled');
		top.removeClass('show');
	}
	

	oldScroll = currentScroll;
});

$( window ).resize(function() {
	if (device.mobile() || device.tablet()){
		$(".jcarousel .li_carusel").width($("body").width() - 40);
		$("#carousel_main .jcarousel img").width($("body").width() - 40);
		$(".carousel_service .jcarousel img").width($("body").width() - 40 - 30);
	}
	
	setTimeout(function(){$('body').css('padding-top',$(".top").outerHeight())},200);
});