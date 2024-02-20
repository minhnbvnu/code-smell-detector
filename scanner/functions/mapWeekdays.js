function mapWeekdays(f) {
    var ms = [];

    for (var i = 1; i <= 7; i++) {
      var dt = DateTime.utc(2016, 11, 13 + i);
      ms.push(f(dt));
    }

    return ms;
  }