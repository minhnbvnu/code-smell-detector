function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }