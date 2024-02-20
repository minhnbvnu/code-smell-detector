function sliderBarView(lebal, maxValue, initValue) {
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 20));

    var sliderView = NSSlider.alloc().initWithFrame(NSMakeRect(0, 0, 200, 20));
    sliderView.setMaxValue(maxValue);
    sliderView.setMinValue(0);
    sliderView.setIntValue(initValue);

    var textView = NSTextField.alloc().initWithFrame(NSMakeRect(210, 0, 90, 20));
    textView.setStringValue(lebal);
    textView.setTextColor(NSColor.blackColor());
    textView.setBezeled(false);
    textView.setDrawsBackground(false);
    textView.setEditable(false);
    textView.setSelectable(false);

    view.addSubview(textView);
    view.addSubview(sliderView);

    return { container: view, label: textView, slider: sliderView };
}