function fixFormat(format, _moment) {
  var i = 5
  var replace = function (input) {
    return _moment.localeData().longDateFormat(input) || input
  }
  while (i > 0 && localFormattingTokens.test(format)) {
    i -= 1
    format = format.replace(localFormattingTokens, replace)
  }
  return format
}