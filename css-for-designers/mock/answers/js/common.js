/////////////////////////////////////////////////////////////////////////////////////////////////////
// common.js
/////////////////////////////////////////////////////////////////////////////////////////////////////

var WIN = $(window)
var WinW
var WinH
var BODY = $('body')
var Wrap = $('#wrapAll')
var Main = $('#main')
var HEADER = $('header')
var HeaderH
var HeaderW
var FOOTER = $('footer')
var FooterH
var FooterW
var TB = 979
var SP = 479
var Career = "PC"
var CareerSet = "PC"
var mousewheel = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll'


// ******* Animate coverの秒数を指定する(/ms)
var AnimateCoverDuration = 500;
// ******* Animate coverのイージングを↓より指定する
// @link http://semooh.jp/jquery/cont/doc/easing/
var AnimateCoverEasing = 'linear';



WIN.ready(function(){
    animateCoverInit();
    $(window).scrollTop(0);
    $('html,body').animate({ scrollTop: 0 }, '1');
});

jQuery.event.add(window,"load",function(){
    CommonInit()
    animateCover()
    BODY.addClass('load')
});


WIN.resize(function(){
    CommonInit()
});

var SCROLL = 0
WIN.scroll(function(){
    SCROLL = WIN.scrollTop();
    if(SCROLL > $('#mv').height()){
        HEADER.addClass('on')
    } else {
        HEADER.removeClass('on')
    }
});

function CommonInit(){
    WinW = WIN.width()
    WinH = WIN.height()
    HeaderH = HEADER.height()
    HeaderW = HEADER.width()
    FooterH = FOOTER.height()
    FooterW = FOOTER.width()
    CareerCheck()
}

function CareerCheck(){
    if(WinW > TB){
        Career = "PC"
    } else if(WinW > SP){
        Career = "TB"
    } else {
        Career = "SP"
    }
    CareerSet = Career
}

function animateCoverInit(){
    if($('.animate_cover').length){
        $("#wrapAll").css({
            "position":"fixed"
         });
    }
}


function animateCover(){
    if($('.animate_cover').length){
        $(document).on(mousewheel,function(){
            $(".animate_cover").animate({"top":-WinH},AnimateCoverDuration,AnimateCoverEasing,function(){
                $("#wrapAll").css({"position":"relative"});
            });
            $(document).off(mousewheel);
        });
    }
}