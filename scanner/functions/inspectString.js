function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
      return inspectString($slice$2.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    var s = $replace$1.call($replace$1.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, "single", opts);
  }