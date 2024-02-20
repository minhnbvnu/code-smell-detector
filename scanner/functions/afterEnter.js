function afterEnter() {
    // only listen for title updates after it has entered
    // but also deregister the observe before it leaves
    var viewTitleAttr = isDefined($attrs.viewTitle) && 'viewTitle' || isDefined($attrs.title) && 'title';
    if (viewTitleAttr) {
      titleUpdate($attrs[viewTitleAttr]);
      deregisters.push($attrs.$observe(viewTitleAttr, titleUpdate));
    }

    if (isDefined($attrs.hideBackButton)) {
      deregisters.push($scope.$watch($attrs.hideBackButton, function(val) {
        navViewCtrl.showBackButton(!val);
      }));
    }

    if (isDefined($attrs.hideNavBar)) {
      deregisters.push($scope.$watch($attrs.hideNavBar, function(val) {
        navViewCtrl.showBar(!val);
      }));
    }
  }