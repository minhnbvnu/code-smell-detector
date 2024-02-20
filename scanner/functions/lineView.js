function lineView(x, y, w, h) {
    var view = NSView.alloc().initWithFrame(NSMakeRect(x, y, w, h));
    view.setWantsLayer(true);
    view.layer().setBackgroundColor(CGColorCreateGenericRGB(1, 0, 0, 0.8));
    return view;
}