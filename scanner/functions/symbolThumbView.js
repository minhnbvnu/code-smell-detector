function symbolThumbView(context, symbol, x, y, imageWidth, imageHeight, label) {
    var preview = require("../modules/preview");
    var imageViewWrap = NSView.alloc().initWithFrame(NSMakeRect(x, y, imageWidth, imageHeight));
    var imageView = NSImageView.alloc().initWithFrame(NSMakeRect(0, 0, imageWidth, imageHeight));
    var symbolPreviewImage = preview.symbol(symbol_2, [imageWidth * 2, imageHeight * 2]);

    var backgroundImage = NSImage.alloc().initWithContentsOfURL(context.plugin.urlForResourceNamed("bg_alpha.png"));
    imageView.setWantsLayer(true);
    imageView.setBackgroundColor(NSColor.colorWithPatternImage(backgroundImage));
    imageView.setImage(symbolPreviewImage);

    var textLableView = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 20, 20));
    textLableView.setFont(NSFont.boldSystemFontOfSize(10));
    textLableView.setTextColor(NSColor.whiteColor());
    textLableView.setStringValue(label);
    textLableView.setBezeled(false);
    textLableView.setWantsLayer(true);
    textLableView.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0, 0.6, 0, 1));
    if (label == "OLD") {
        textLableView.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.9, 0, 0, 1));
    }
    textLableView.setEditable(false);
    textLableView.sizeToFit();

    imageViewWrap.addSubview(imageView);
    imageViewWrap.addSubview(textLableView);
    return imageViewWrap;
}