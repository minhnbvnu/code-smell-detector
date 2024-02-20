function number(value, format, options) {
  const globalOptions = this && this.number ? this.number : {}
  format = util.exist(format) ? format : globalOptions.format
  options = options || globalOptions
  const config = parseFormat(format)
  const number = parseNumber(value)
  const thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ','
  const decimalSeparator = options.decimalSeparator != null ? options.decimalSeparator : '.'

  config.sign = config.sign || number.sign

  if (config.unit) {
    const numberWithUnit = addUnit(number.float, config)
    return config.sign + numberWithUnit
  }

  const rounded = toFixed(number.float, config.decimals)

  const output = addSeparators(rounded, config.base, thousandsSeparator, decimalSeparator)

  return config.sign + output
}