function onHardwareBackButton() {
    var last = popupStack[popupStack.length - 1];
    last && last.responseDeferred.resolve();
  }