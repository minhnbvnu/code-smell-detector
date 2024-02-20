function getColumnWidth(TH) {
    var instance = this;
    var thOffset = instance.view.wt.wtDom.offset(TH).left - instance.view.wt.wtDom.offset(TH).left;
    var rootOffset = instance.view.wt.wtDom.offset(instance.rootElement[0]).left;
    var col = instance.view.wt.wtTable.getCoords(TH)[1]; //getCoords returns array [row, col]
    var thWidth = instance.getColWidth(col);
    var maxWidth = instance.view.maximumVisibleElementWidth(thOffset - rootOffset);
    return Math.min(thWidth, maxWidth);
  }