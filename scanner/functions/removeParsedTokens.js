function removeParsedTokens(config) {
  var string = config._i + ''
    , input = ''
    , format = ''
    , array = config._f.match(formattingTokens)
    , len = array.length
    , i
    , match
    , parsed

  for (i = 0; i < len; i += 1) {
    match = array[i]
    parsed = (getParseRegexForToken(match, config).exec(string) || [])[0]
    if (parsed)
      string = string.slice(string.indexOf(parsed) + parsed.length)
    if (!(formatTokenFunctions[match] instanceof Function)) {
      format += match
      if (parsed)
        input += parsed
    }
  }
  config._i = input
  config._f = format
}