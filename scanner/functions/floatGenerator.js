function floatGenerator(options) {
  var max = options.max,
      min = options.min,
      fixed = options.fixed;
  var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return Number(randomnumber.toFixed(fixed));
}