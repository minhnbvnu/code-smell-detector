function andInputGroup(view, x, width, label, defaultString) {
    var ui = require("../modules/Dialog").ui;
    var labelView = ui.textLabel(label, [x, 25, width, 25]);
    view.addSubview(labelView);
    var inputView = ui.textField(defaultString, [x, 0, width, 25])
    var formatter = NSNumberFormatter.alloc().init().autorelease();
    formatter.setNumberStyle(NSNumberFormatterNoStyle);
    inputView.setFormatter(formatter);
    view.addSubview(inputView);
    return inputView;
}