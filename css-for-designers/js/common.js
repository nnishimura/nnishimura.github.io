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

WIN.ready(function(){
    $(window).scrollTop(0);
    $('html,body').animate({ scrollTop: 0 }, '1');
});

jQuery.event.add(window,"load",function(){
    CommonInit()
    BODY.addClass('load')
});

WIN.resize(function(){
    CommonInit()
});

var SCROLL = 0
WIN.scroll(function(){
    SCROLL = WIN.scrollTop();
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


