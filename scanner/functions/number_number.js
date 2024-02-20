function number_number(value, format, options) {
  var globalOptions = this && this.number ? this.number : {};
  format = src_util.exist(format) ? format : globalOptions.format;
  options = options || globalOptions;
  var config = parseFormat(format);
  var number = parseNumber(value);
  var thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';
  var decimalSeparator = options.decimalSeparator != null ? options.decimalSeparator : '.';
  config.sign = config.sign || number.sign;

  if (config.unit) {
    var numberWithUnit = addUnit(number.float, config);
    return config.sign + numberWithUnit;
  }

  var rounded = number_toFixed(number.float, config.decimals);
  var output = addSeparators(rounded, config.base, thousandsSeparator, decimalSeparator);
  return config.sign + output;
}