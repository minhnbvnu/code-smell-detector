function applyGridToLayer(gridSetting, layer) {
    var grid = MSSimpleGrid.alloc().init();
    grid.setGridSize(gridSetting.girdSize);
    grid.setThickGridTimes(gridSetting.thickGridTimes);
    grid.setIsEnabled(true);
    layer.setGrid(grid);
}