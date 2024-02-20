function getMaxPower2(number) {
    var maxPower = 0;
    var value = number;
    while (value >= 2) {
      value /= 2;
      maxPower++;
    }

    value = 2;
    for (var i = 1; i < maxPower; i++)
      value *= 2;
    return value;
  }