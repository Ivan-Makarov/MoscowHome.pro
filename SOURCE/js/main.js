var slideTime = 10000;
var slideStep = 1000;
var currentTime = slideTime;
var maxStroke = -301;
var isPause = false;
var interval;

$(document).ready(function(){
	
	
	interval = setInterval(function(){
		if (!isPause){
			
			if (currentTime <= 0){
				$('.jcarousel').jcarousel('scroll', '+=1');
				currentTime = slideTime;
			}
			else{
				$("#progress").animate({'stroke-dashoffset':(currentTime - slideStep)/slideTime * maxStroke},slideStep,'linear',function(){
					
				});
				currentTime -= slideStep;
			}
		}
	},slideStep);
	
	var total = $('.jcarousel ul li').length;
	$('#circle-counter .total').text("/ "+total);
	
	$('.jcarousel').jcarousel({
		wrap: 'circular'
	}).on('jcarousel:animateend', function (event, carousel) {
		$('#circle-counter .count').text(carousel.target().attr("data-index"));
		$(".projects_count .count").text(carousel.target().attr("data-projects_count")).prop('Counter',0).animate({
			Counter: $(".projects_count .count").text()
		}, {
			duration: 2000,
			easing: 'swing',
			step: function (now) {
			   $(".projects_count .count").text(Math.ceil(now));
			}
		});
		isPause = true;
		
		$("#progress").animate({'stroke-dashoffset':maxStroke},function(){
			isPause = false;
		});
		
		$('.info .title_block .title').animate({left:200,opacity:0},function(){
			$('.info .title_block .title')
				.text(carousel.target().attr("data-title"))
				.css({left:-200})
				.animate({left:0,opacity:1});
		});
		$('.info .buttons .more span').text("подробнее " + carousel.target().attr("data-button_title"));
		
		var paginationTarget = $(".carousel_pagination div").eq(carousel.target().attr("data-index")-1);
		$(".carousel_pagination div").removeClass("active");
		paginationTarget.addClass("active");
		$(".carousel_pagination").animate({ scrollLeft: $(".carousel_pagination").scrollLeft() + paginationTarget.offset().left - 60 }, 300);
		$(".carousel_pagination_border").animate({width:paginationTarget.width() - 35,left:paginationTarget.position().left + 80 + 35});
	});
	
	$('.jcarousel').jcarousel('scroll', '0');
	
	$(".carousel_navigation .navigation_left").click(function(){
		$('.jcarousel').jcarousel('scroll', '-=1');
	});
	$(".carousel_navigation .navigation_right").click(function(){
		$('.jcarousel').jcarousel('scroll', '+=1');
	});
	
	$(".carousel_pagination div").click(function(){
		$('.jcarousel').jcarousel('scroll', $(".jcarousel li[data-index="+($(this).index()+1)+"]").index());
	});
	$("#carousel_main").mouseenter(function(){
		isPause = true;
	});
	$("#carousel_main").mouseleave(function(){
		isPause = false;
	});
});