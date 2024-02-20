function sliderToogleTooltip(right, visible) {
    //Fixes slider tooltip bug
    var slider;
    if (right) {
        slider = $('#padding-right-slider').find('.tooltip');
    } else {
        slider = $('#padding-bottom-slider').find('.tooltip');
    }
    if (visible) {
        slider.css("display", "");
    } else {
        slider.css("display", "none");
    }
    $("#padding-right").unbind("mouseenter mouseleave");
}