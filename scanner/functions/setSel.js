function setSel() {
    var ranges = argsToRanges(arguments);
    return function(cm) { cm.setSelections(ranges, 0); };
  }