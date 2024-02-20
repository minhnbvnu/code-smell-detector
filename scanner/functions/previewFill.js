function previewFill(fillType, fillContent) {
    var oval = MSOvalShape.alloc().init();
    oval.setRect(CGRectMake(0, 0, 20, 20));
    var image = oval.style().addStylePartOfType(0);
    image.setFillType(4);
    image.setImage(MSImageData.alloc().initWithImage(NSImage.imageNamed("checkerboard")));
    image.setPatternFillType(0);
    image.setPatternTileScale(0.35);
    var fill = oval.style().addStylePartOfType(0);
    fill.setFillType(fillType);
    fill.setColor(fillContent);
    var innerShadow = oval.style().addStylePartOfType(3);
    innerShadow.setColor(MSColor.colorWithRed_green_blue_alpha(0, 0, 0, 0.2));
    innerShadow.setOffsetX(0);
    innerShadow.setOffsetY(0);
    innerShadow.setBlurRadius(0);
    innerShadow.setSpread(1);
    var artboard = artboardWithLayer(20, 20, oval);
    return artboardPreviewGenerator(artboard, 40, 40, true);
}