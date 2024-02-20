function artboardPreviewGenerator(artboard, width, height, remove) {
    var document = sketch.getSelectedDocument();
    if (remove) {
        document.selectedPage.sketchObject.addLayer(artboard);
    }
    var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry(artboard.ancestry()).firstObject();
    // var scale = Math.min(width / artboard.frame().width(), height / artboard.frame().height());
    // exportRequest.setScale(scale * 2);
    var colorSpace;
    if (version >= 86) {
        colorSpace = document.sketchObject.colorSpace().CGColorSpace();
    } else {
        colorSpace = document.sketchObject.colorSpace();
    }
    var exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, colorSpace);
    var image;
    if (version >= 96) {
        image = NSImage.alloc().initWithData(exporter.data());
    } else {
        image = exporter.image();
    }
    if (remove) {
        artboard.removeFromParent();
    }
    return image;
}