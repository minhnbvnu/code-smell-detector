function bjorklund(slots, pulses) {
  var pattern = [],
      count = [],
      remainder = [pulses],
      divisor = slots - pulses,
      level = 0,
      build_pattern = function (lv) {
    if (lv == -1) {
      pattern.push(0);
    } else if (lv == -2) {
      pattern.push(1);
    } else {
      for (var x2 = 0; x2 < count[lv]; x2++) {
        build_pattern(lv - 1);
      }

      if (remainder[lv]) {
        build_pattern(lv - 2);
      }
    }
  };

  while (remainder[level] > 1) {
    count.push(Math.floor(divisor / remainder[level]));
    remainder.push(divisor % remainder[level]);
    divisor = remainder[level];
    level++;
  }

  count.push(divisor);
  build_pattern(level);
  return pattern.reverse();
}