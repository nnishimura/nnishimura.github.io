/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// slide.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

var Slide = $("#slide");
var SlideUl = $("#slide ul#article");
var SlidePic = $(".slide_wrap li.page");
var SlidePicImg = $(".slide_wrap li.page img.pic");
var SlideH = "full"; //"full" or "auto"  or "num"
var SlideLen = SlidePic.length;
var StarNum = 0;
var SlideIndex = 0;
var SlideTimer;

var SlideW = Slide.width()

///AUTOSLIDE
var AUTOSLIDE = false; //true or false
var SlideInterval = 5000;

///SLIDECTRL
var CTRL = true; //true or false
var CtrlBtn;

///SLIDEARR
var SLIDEARR = true; //true or false
var slideArr, slideArrNext, slideArrPrev

jQuery.event.add(window, "load", function() {

    if (CTRL == true) {
        CtrlInit();
    }

    if (SLIDEARR == true) {
        ArrInit();
    }

    $(".slide_wrap").css({ 'overflow': 'hidden' });
    SlideUl.prepend(SlidePic.eq(SlideLen - 1).clone(true))
    SlideUl.append(SlidePic.eq(0).clone(true))
    SlidePic = $(".slide_wrap li.page");
    SlidePic.css({ 'width': SlideW })
    SlideLen = SlidePic.length;
    SlidePic.addClass('on')
    SlideInit();
    SlideIndex = StarNum;
    SlideSet();
});

WIN.resize(function() {
    clearTimeout(SlideTimer)
    SlideW = Slide.width()
    SlideUl.css({ 'width': SlideW * SlideLen })
    SlidePic.css({ 'width': SlideW })
    clearTimeout(SlideTimer)
    for (var i = 0; i < SlidePic.length; i++) {
        SlidePic.eq(i).css({ 'left': i * SlideW })
    }

    SlideInit();
    SlideSet();
});

function SlideInit() {
    if (SlideH == "full") {
        Slide.height(WinH);
    } else if (SlideH == "auto") {
        var si = new Image();
        si.src = SlidePicImg.eq(0).attr('src');
        var siW = si.width;
        var siH = si.height;
        var simgRatio = siH / siW;
        Slide.height(WinW * simgRatio);
    } else {
        Slide.height(SlideH);
    }
    // SlideW = Slide.width()
    for (var i = 0; i < SlidePic.length; i++) {
        SlidePic.eq(i).css({ 'left': i * SlideW })
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

$('.mokuji li a').click(function() {
    clearTimeout(SlideTimer)
    var ctrlIndex = $('.mokuji li a').index(this)+2
    SlideIndex = ctrlIndex;
    SlideSet()
})

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
    // slideArr.height(WinH)
    
}

function SlideSet() {
    $(window).scrollTop(0);
    $('html,body').animate({ scrollTop: 0 }, '1');
    if (SlideIndex == SlideLen - 1) {
        SlideUl.animate({ 'left': 0 }, function() {
            SlideIndex = SlideLen - 3;
            SlideUl.css({ 'left': -((SlideIndex + 1) * SlideW) });
            if (CTRL == true) {
                CtrlBtn.eq(SlideIndex).addClass('on');
            }
        })
    } else {
        SlideUl.animate({ 'left': -((SlideIndex + 1) * SlideW) }, function() {
            if (SlideIndex == SlideLen - 2) {
                SlideIndex = 0;
                SlideUl.css({ 'left': -((SlideIndex + 1) * SlideW) });
                if (CTRL == true) {
                    CtrlBtn.eq(SlideIndex).addClass('on');
                }
            }
        })
    }
    if (CTRL == true) {
        CtrlBtn.removeClass('on');
        CtrlBtn.eq(SlideIndex).addClass('on');
    }

    if(SlidePic.eq(SlideIndex+1).height() > WinH){
        Slide.height(SlidePic.eq(SlideIndex+1).height());
    } else {
        Slide.height(WinH);
        SlidePic.eq(SlideIndex+1).height(WinH)
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


////// Flick
var startX;
var startY;
var diffX;
var diffY;
var THRESHOLD = 20;
var winpoint
var OverFlg = false;
var UlLeft
Slide.on("touchstart touchmove touchend", touchHandler);

function touchHandler(e) {
    var touch = e.originalEvent.touches[0];
    if (e.type == "touchstart") {
        startX = touch.pageX;
        startY = touch.pageY;
        UlLeft = parseInt(SlideUl.css('left'))
        // console.log(UlLeft)
    } else if (e.type == "touchmove") {
        diffX = touch.pageX - startX;
        diffY = touch.pageY - startY;
        if (diffX > 10 || -diffX > 10) {
            e.preventDefault();
            SlideUl.css({ 'left': diffX+UlLeft });

            if (diffX > SlideW / 3 || -diffX > SlideW / 3) {
                OverFlg = true;
            }
        }
    } else if (e.type == "touchend") {
        if (diffX > THRESHOLD || -diffX > THRESHOLD) {
            if(OverFlg == true){
                if (diffX > THRESHOLD) {
                    // PREV処理
                    SlidePrev()
                } else if (diffX < -THRESHOLD) {
                    // NEXT処理
                    SlideNext()
                }
            } else {
                SlideSet()
            }
        }
        OverFlg = false;
        diffX = 0;
        diffY = 0;
        diffTime = 0
    }
}
