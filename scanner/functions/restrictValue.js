function restrictValue(sliderView, minValue, maxValue) {
    var value = sliderView.intValue();
    if (value <= minValue) {
        value = minValue + 1;
    }
    if (value >= maxValue) {
        value = maxValue - 1;
    }
    sliderView.setIntValue(value);
}