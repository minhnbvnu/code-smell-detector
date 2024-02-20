function canSwipeBack(ele, viewLocals) {
    if (viewLocals && viewLocals.$$state && viewLocals.$$state.self.canSwipeBack === false) {
      return false;
    }
    if (ele && ele.attr('can-swipe-back') === 'false') {
      return false;
    }
    var eleChild = ele.find('ion-view');
    if (eleChild && eleChild.attr('can-swipe-back') === 'false') {
      return false;
    }
    return true;
  }