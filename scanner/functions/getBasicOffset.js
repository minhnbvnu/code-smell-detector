function getBasicOffset(time) {
      var off = parseTimeString(time)
        , adj = time.indexOf('-') === 0 ? -1 : 1;
      off = adj * (((off[1] * 60 + off[2]) * 60 + off[3]) * 1000);
      return off/60/1000;
    }