function destroyViewEle(ele) {
    // we found an element that should be removed
    // destroy its scope, then remove the element
    if (ele && ele.length) {
      var viewScope = ele.scope();
      if (viewScope) {
        viewScope.$emit('$ionicView.unloaded', ele.data(DATA_VIEW));
        viewScope.$destroy();
      }
      ele.remove();
    }
  }