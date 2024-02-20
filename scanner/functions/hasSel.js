function hasSel() {
    var ranges = argsToRanges(arguments);
    return function(cm) {
      var sels = cm.listSelections();
      if (sels.length != ranges.length)
        throw new Failure("Expected " + ranges.length + " selections, but found " + sels.length);
      for (var i = 0; i < sels.length; i++) {
        eqCharPos(sels[i].anchor, ranges[i].anchor, "anchor " + i);
        eqCharPos(sels[i].head, ranges[i].head, "head " + i);
      }
    };
  }