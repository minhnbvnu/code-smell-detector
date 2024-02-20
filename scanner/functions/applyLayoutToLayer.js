function applyLayoutToLayer(layoutSetting, layer) {
    var layout = MSLayoutGrid.alloc().init();

    layout.setDrawVertical(layoutSetting.drawVertical);
    layout.setTotalWidth(layoutSetting.totalWidth);
    layout.setHorizontalOffset(layoutSetting.horizontalOffset);
    layout.setNumberOfColumns(layoutSetting.numberOfColumns);
    layout.setGuttersOutside(layoutSetting.guttersOutside);

    layout.setGutterWidth(layoutSetting.gutterWidth);
    layout.setColumnWidth(layoutSetting.columnWidth);

    layout.setDrawHorizontal(layoutSetting.drawHorizontal);
    layout.setGutterHeight(layoutSetting.gutterHeight);
    layout.setRowHeightMultiplication(layoutSetting.rowHeightMultiplication);
    layout.setDrawHorizontalLines(layoutSetting.drawHorizontalLines);
    layout.setIsEnabled(true);

    layer.setLayout(layout);
}