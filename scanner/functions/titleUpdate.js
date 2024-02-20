function titleUpdate(newTitle) {
    if (isDefined(newTitle) && newTitle !== viewTitle) {
      viewTitle = newTitle;
      navViewCtrl.title(viewTitle);
    }
  }