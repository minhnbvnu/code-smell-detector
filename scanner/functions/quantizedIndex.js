function quantizedIndex(i) {
    if(i < 1) { return 0; }
    var group = Math.floor(Math.log(i) / Math.LN10),
        offset = i/(2.5 * Math.pow(10, group));
    if(offset >= 3) {
      group++;
      offset = 0;
    }
    return 3*group + Math.round(Math.min(2, offset));
  }