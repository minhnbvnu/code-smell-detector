function parseFromTokens(locale, input, format) {
    var _explainFromTokens = explainFromTokens(locale, input, format),
        result = _explainFromTokens.result,
        zone = _explainFromTokens.zone,
        invalidReason = _explainFromTokens.invalidReason;

    return [result, zone, invalidReason];
  }