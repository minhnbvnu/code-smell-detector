function arrangeLayers(layers, originX, originY, gapX, gapY, rowTop, snapDistance) {

    // Row layers
    var rowGroup = [];
    var loopLayers = layers.objectEnumerator();
    var layer;
    while (layer = loopLayers.nextObject()) {
        if (layer.frame().y() - originY < snapDistance) {
            rowGroup.push(layer);
        }
    }

    // Sort by position x
    rowGroup.sort(function(a, b) {
        return a.frame().x() - b.frame().x();
    });

    // Arrange layers in a row
    var x = originX;
    var newRowTop = rowTop;
    for (var i = 0; i < rowGroup.length; i++) {
        var rowGroupLayer = rowGroup[i];
        rowGroupLayer.frame().setX(x);
        rowGroupLayer.frame().setY(rowTop);
        x = x + Math.round(rowGroupLayer.frame().width()) + gapX;
        if (newRowTop < Math.round(rowTop + rowGroupLayer.frame().height())) {
            newRowTop = Math.round(rowTop + rowGroupLayer.frame().height())
        }
    }

    newRowTop += gapY;

    layers.removeObjectsInArray(rowGroup);

    if (layers.count() > 0) {
        arrangeLayers(layers, originX, help.getMSRectFromMSLayers(layers).y(), gapX, gapY, newRowTop, snapDistance)
    }

}