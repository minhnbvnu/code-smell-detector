function basicGenerator(option) {
  var randomNumber = Math.random() * 1000;

  if (!option) {
    return randomNumber;
  }

  var _a = option,
      min = _a.min,
      max = _a.max;

  if (min && max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return randomNumber;
}