/////////////////////////////////////////////////////////////////////////////////////////////////////
// slide.js
/////////////////////////////////////////////////////////////////////////////////////////////////////

var Slide = $("#slide");
var SlidePic = $(".slide_wrap li");
var SlideLen = SlidePic.length;
var StarNum = 0;
var SlideIndex = 0;
var SlideTimer;

// ******* スライドの高さを指定する（幅はcssで指定）
var SlideH = "full";
// "full" or "ratio"  or "num"
// var SlideH = "full"; 画面サイズ
// var SlideH = "0.5"; window高さの50%(0.5)
// var SlideH = "500"; 500px

///AUTOSLIDE
var AUTOSLIDE = true; //true or false
var SlideInterval = 8000; //自動スライドの間隔
// *******スライドの速さはcssで

///SLIDECTRL
var CTRL = false; //true or false
var CtrlBtn;
///SLIDEARR
var SLIDEARR = false; //true or false
var slideArr, slideArrNext, slideArrPrev

jQuery.event.add(window, "load", function() {
    if (CTRL == true) {
        CtrlInit();
    }
    if (SLIDEARR == true) {
        ArrInit();
    }
    SlideInit();
    SlideIndex = StarNum;

    if(SlideLen > 1){
        SlideSet();
    }
});

WIN.resize(function() {
    SlideInit();
});

function SlideInit() {
    if (SlideH == "full") {
        Slide.height(WinH);
    } else {
        if(SlideH <= 1){
            Slide.height(WinH*SlideH);
        } else {
            Slide.height(SlideH);
        }
        
    }
}

function CtrlInit() {
    var CtrlHTML = "<ul class='ctrl'>"
    for (var i = 0; i < SlideLen; i++) {
        CtrlHTML += "<li><a href='javascript:void(0)'></a></li>";
    }
    CtrlHTML += "</ul>"
    Slide.append(CtrlHTML)
    CtrlBtn = $('ul.ctrl li a')
    CtrlBtn.click(function() {
        clearTimeout(SlideTimer)
        var ctrlIndex = CtrlBtn.index(this)
        SlideIndex = ctrlIndex;
        SlideSet()
    })
}

function ArrInit() {
    Slide.append("<a href='javascript:void(0)' class='slide_arr slide_prev'></a><a href='javascript:void(0)' class='slide_arr slide_next'></a>")
    slideArr = $('.slide_arr');
    slideArrPrev = $('.slide_prev');
    slideArrNext = $('.slide_next');

    slideArrNext.click(function() {
        SlideNext();
    });
    slideArrPrev.click(function() {
        SlidePrev();
    });
}

function SlideSet() {
    SlidePic.removeClass('on');
    SlidePic.eq(SlideIndex).addClass('on');
    if (CTRL == true) {
        CtrlBtn.removeClass('on');
        CtrlBtn.eq(SlideIndex).addClass('on');
    }
    if (AUTOSLIDE == true) {
        SlideTimer = setTimeout(function() {
            if (SlideIndex < SlideLen - 1) {
                SlideIndex++;
            } else {
                SlideIndex = 0;
            }
            SlideSet()
        }, SlideInterval);
    }
}

function SlideNext() {
    clearTimeout(SlideTimer)
    if (SlideIndex < SlideLen - 1) {
        SlideIndex++;
    } else {
        SlideIndex = 0;
    }
    SlideSet()
}

function SlidePrev() {
    clearTimeout(SlideTimer)
    if (SlideIndex > 0) {
        SlideIndex--;
    } else {
        SlideIndex = SlideLen - 1;
    }
    SlideSet()
}


