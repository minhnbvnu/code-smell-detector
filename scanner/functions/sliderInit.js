function sliderInit() {
    var sliderOptions = {
        formatter: function (value) {
            return value[0] + "% : " + (100 - value[1]) + "%";
        }
    };
    var sliderRight = $('#padding-right').slider(sliderOptions);
    var sliderBottom = $('#padding-bottom').slider(sliderOptions);

    sliderBottom.on("slideStart", function() {
        sliderToogleTooltip(true, false);
    }).on("slideStop", function() {
        sliderToogleTooltip(true , true);
    }).on("change", function() {
        redraw(true);
    });

    sliderRight.on("slideStart", function() {
        sliderToogleTooltip(false, false);
    }).on("slideStop", function() {
        sliderToogleTooltip(false , true);
    }).on("change", function() {
        redraw(true);
    });
}