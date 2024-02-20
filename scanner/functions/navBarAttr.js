function navBarAttr(ctrl, val) {
    ctrl && ionic.DomUtil.cachedAttr(ctrl.containerEle(), 'nav-bar', val);
  }