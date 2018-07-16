var $wrapper = $('.wrapper'),
    $slider = $('.slider'), //获取PPT的数量。
    $sliderContent = $('.slider-content'),
    $sliderImage = $('.slider-image'),
    sliderLen = $slider.length;
// 动态添加左右按钮和下面的小圆点，方便后期增加或者删除PPT方便一些。
(function(len) {
    // PPT数量只要大于1，就需要按钮和小圆点。
    if (len > 1) {
        var str = '';
        // 有多少页PPT就有多少个小圆点。
        for (var i = 0; i < len; i++) {
            if (i === 0) {
                str += '<li class="active"></li>';
            } else {
                str += '<li></li>'
            }
        }
        var pointStr = `<div class="slider-point">
                            <ul>${str}</ul>
                        </div>`,
            btnStr = `<div class="slider-btn">
                            <span class="prev-btn"></span>
                            <span class="next-btn"></span>
                        </div>`;
        $wrapper.append(btnStr).append(pointStr);
    }
    console.log(str);
})(sliderLen);
// 点击left展示上一页，点下right展示下一页，点击小圆点跳转
var $prevBtn = $('.prev-btn'),
    $nextBtn = $('.next-btn'),
    $point = $('.slider-point li'),
    activeIndex = 0,
    lastIndex,
    flag = true;
$prevBtn.on('click', function() {
    clickFun('prev');
});
$nextBtn.on('click', function() {
    clickFun('next');
});
$point.on('click', function() {
    var index = $(this).index();
    clickFun(index);
});

function clickFun(direction) {
    if (flag) {
        $.getSliderIndex(direction);
        if (lastIndex !== activeIndex) {
            flag = false;
            $slider.eq(lastIndex).trigger('go').end().eq(activeIndex).trigger('come');
            pointStyle(activeIndex);
        }
    }
}

function pointStyle(activeIndex) {
    $('.active').removeClass('active');
    $point.eq(activeIndex).addClass('active');
}
// 拓张一个获取索引的方法
$.extend({
    getSliderIndex: function(direction) {
        lastIndex = activeIndex;
        switch (direction) {
            case 'prev':
                activeIndex = activeIndex === 0 ? sliderLen - 1 : activeIndex - 1;
                break;
            case 'next':
                activeIndex = activeIndex === sliderLen - 1 ? 0 : activeIndex + 1;
                break;
            default:
                activeIndex = direction;
        }
        console.log(direction, 'last:' + lastIndex, 'next:' + activeIndex);
    }
});
// 消失
$slider.on('go', function() {
    // fadeOut() 逐渐改变被选元素的不透明度，从可见到隐藏display:none
    $slider.eq(lastIndex).fadeOut(300).find($sliderContent).css('font-size', '12px').end().find($sliderImage).css('width', '0%');
});
// 展现
$slider.on('come', function() {
    // fadeIn() 逐渐改变被选元素的不透明读，从隐藏到显示。
    $slider.eq(activeIndex).delay(300).fadeIn(300).find($sliderContent).animate({ 'font-size': '20px' }, 300).end().find($sliderImage).animate({ width: '40%' }, 300, function() {
        flag = true;
    });
})