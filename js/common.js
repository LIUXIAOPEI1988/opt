
/* !stack ------------------------------------------------------------------- */
/* 全てのスマホで幅320px(iphone)相当に見えるようにdpiを調整 */
jQuery(document).ready(function($) {
	pageScroll();
	rollover();
	common();
});

$(function() { //IE8のalpha使用時に発生の黒枠を消す
    if(navigator.userAgent.indexOf("MSIE") != -1) {
        $('img').each(function() {
            if($(this).attr('src').indexOf('.png') != -1) {
                $(this).css({
                    'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                    $(this).attr('src') +
                    '", sizingMethod="scale");'
                });
            }
        });
    }
});	

/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
	var o = {};
	o.ie      = function(){ return indexOfKey("msie"); }
	o.fx      = function(){ return indexOfKey("firefox"); }
	o.chrome  = function(){ return indexOfKey("chrome"); }
	o.opera   = function(){ return indexOfKey("opera"); }
	o.android = function(){ return indexOfKey("android"); }
	o.ipad    = function(){ return indexOfKey("ipad"); }
	o.ipod    = function(){ return indexOfKey("ipod"); }
	o.iphone  = function(){ return indexOfKey("iphone"); }
	return o;
})();
/* !init Smart Devices ------------------------------------------------------ */
(function (){
	var parentNode = document.getElementsByTagName('head')[0];
	var viewport = {
		withzoom:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
		android : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
		ipad    : 'width=1200',
		//iphonescale1  : 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
		iphone  : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
	}
	meta = document.createElement('meta');
	meta.setAttribute('name','viewport');

	if( isUA.android() ){
		meta.setAttribute('content',viewport.android);
		parentNode.appendChild(meta);
	}else if( isUA.ipad() ){
		meta.setAttribute('content',viewport.ipad);
		parentNode.appendChild(meta);
	}else if( isUA.ipod() || isUA.iphone() ){
		meta.setAttribute('content',viewport.iphone);
		parentNode.appendChild(meta);
	}else{
	}
})();
/* !rollover ---------------------------------------------------------------- */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'}
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};
/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}; 
	$('a.scroll, .scroll a').each(function(){
		$(this).bind("click keypress",function(e){
			e.preventDefault();
			var target  = $(this).attr('href');
			var targetY = $(target).offset().top;
			var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
			$(parent).animate(
				{scrollTop: targetY },
				400
			);
			return false;
		});
	});
	$('.pageTop a, .spPageTop a').click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow','swing');
		return false;
	});
}



/* !common --------------------------------------------------- */
var common = (function(){
	$('.navbar-toggle').on('click',function(){
	    if($(this).hasClass('active')){
	      $(this).removeClass('active');
	      $('.navbar-collapse').removeClass('open');
	      $('.overlay').removeClass('open');
	    } else {
	      $(this).addClass('active');
	      $('.navbar-collapse').addClass('open');
	      $('.overlay').addClass('open');
	    }
	  });
	  $('.overlay').on('click',function(){
	    if($(this).hasClass('open')){
	      $(this).removeClass('open');
	      $('.navbar-toggle').removeClass('active');
	      $('.navbar-collapse').removeClass('open');
	    }
	  });
	$('.navbar-collapse li a').each(function(){
		$(this).bind("click keypress",function(e){
			e.preventDefault();
			var target  = $(this).attr('href');
			var targetY = $(target).offset().top;
			var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
			$('.navbar-toggle').removeClass('active');
	        $('.navbar-collapse').removeClass('open');
	        $('.overlay').removeClass('open');
			$(parent).animate(
				{scrollTop: targetY },
				400
			);
			return false;
		});
	});
	var activeheader = true;
	if($(window).width() < 768){
		activeheader = false;
	}
	$(window).resize(function (event) {
		if($('.visible-ts').css('display') == 'none') {
			activeheader = true;
			var target = $('.navbar-toggle').data('target');
			$(target).removeClass("open");
			$('.navbar-toggle').removeClass("active");
			$('.overlay').removeClass('open');
		}else{
			activeheader = false;
			$('#header').css({"display": "block"})
		}
	});
	var topBtn = $('.pageTop');	
	topBtn.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
	$(window).on("scroll", function () {
	    // scrollTop()が0より大きい場合
	    if(activeheader){
	    	if ($(this).scrollTop() > 0) {
		      // ヘッダーバーをslideDownして表示
		      $("#header").slideDown();
		    // scrollTop()が0の場合
		    } else {
		      // ヘッダーバーをslideUpして非表示
		      $("#header").slideUp();
		    }
	    }
	  });
	//スクロールしてトップ
    topBtn.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
    });
	
	
});

$(function() {
    $(window).resize(function (event) {
        switchImage($('.visible-ts').css('display') == 'block');
    });
    switchImage($('.visible-ts').css('display') == 'block');
    function switchImage(isVisible_header) {
        $('img').each(function (index) {
            var pc = $(this).attr('src').replace('_sp.', '_pc.');
            var ts = $(this).attr('src').replace('_pc.', '_sp.');
            if (!isVisible_header) {
                $(this).attr("src",pc);
            }else {

                $(this).attr("src",ts);
            }
        });
    }
});


