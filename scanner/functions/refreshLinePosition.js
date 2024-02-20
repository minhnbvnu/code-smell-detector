function refreshLinePosition() {
    var instance = this;
    var thBorderWidth = 2 * parseInt(this.view.wt.wtDom.getComputedStyle(currentTH).borderWidth, 10);
    startWidth = parseInt(this.view.wt.wtDom.outerWidth(currentTH), 10);
    instance.view.wt.wtDom.addClass(resizer, 'active');
    lineStyle.height = instance.view.wt.wtDom.outerHeight(instance.$table[0]) + 'px';
    pressed = instance;
  }