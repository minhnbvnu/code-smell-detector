function refreshResizerPosition(TH) {
    instance = this;
    currentTH = TH;

    var col = this.view.wt.wtTable.getCoords(TH)[1]; //getCoords returns array [row, col]
    if (col >= 0) { //if not row header
      currentCol = col;
      var rootOffset = this.view.wt.wtDom.offset(this.rootElement[0]).left;
      var thOffset = this.view.wt.wtDom.offset(TH).left;
      startOffset = (thOffset - rootOffset) - 6;
      var thStyle = this.view.wt.wtDom.getComputedStyle(TH);
      resizer.style.left = startOffset + parseInt(this.view.wt.wtDom.outerWidth(TH), 10) + 'px';

      this.rootElement[0].appendChild(resizer);
    }
  }