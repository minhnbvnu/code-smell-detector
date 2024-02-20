function mapMonths(f) {
    var ms = [];

    for (var i = 1; i <= 12; i++) {
      var dt = DateTime.utc(2016, i, 1);
      ms.push(f(dt));
    }

    return ms;
  }