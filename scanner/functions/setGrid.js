function setGrid(artboards, gridSize, thickGridTimes) {
    var loopArtboard = artboards.objectEnumerator();
    var artboard;
    while (artboard = loopArtboard.nextObject()) {
        var grid = MSSimpleGrid.alloc().init();
        grid.setThickGridTimes(thickGridTimes);
        grid.setGridSize(gridSize);
        artboard.setGrid(grid);
        artboard.grid().setIsEnabled(true);
    }
}