function processZone(z) {
      if (!z[3]) { return; }
      var yea = parseInt(z[3], 10);
      var mon = 11;
      var dat = 31;
      if (z[4]) {
        mon = SHORT_MONTHS[z[4].substr(0, 3)];
        dat = parseInt(z[5], 10) || 1;
      }
      var string = z[6] ? z[6] : '00:00:00'
        , t = parseTimeString(string);
      return [yea, mon, dat, t[1], t[2], t[3]];
    }