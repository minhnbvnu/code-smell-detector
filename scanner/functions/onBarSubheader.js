function onBarSubheader(ev, isBarSubheader) {
    var associatedNavBarCtrl = getAssociatedNavBarCtrl();
    associatedNavBarCtrl && associatedNavBarCtrl.hasBarSubheader(isBarSubheader);
  }