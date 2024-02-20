function parseTime(str) {
    if (!str) {
      return 0;
    }

    var strings = str.split(":");
    var l = strings.length, i = l;
    var ms = 0, parsed;

    if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
      throw new Error("tick only understands numbers and 'h:m:s'");
    }

    while (i--) {
      parsed = parseInt(strings[i], 10);

      if (parsed >= 60) {
        throw new Error("Invalid time " + str);
      }

      ms += parsed * Math.pow(60, (l - i - 1));
    }

    return ms * 1000;
  }