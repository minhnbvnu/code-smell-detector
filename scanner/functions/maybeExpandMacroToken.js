function maybeExpandMacroToken(token, locale) {
    if (token.literal) {
      return token;
    }

    var formatOpts = Formatter.macroTokenToFormatOpts(token.val);

    if (!formatOpts) {
      return token;
    }

    var formatter = Formatter.create(locale, formatOpts);
    var parts = formatter.formatDateTimeParts(getDummyDateTime());
    var tokens = parts.map(function (p) {
      return tokenForPart(p, locale, formatOpts);
    });

    if (tokens.includes(undefined)) {
      return token;
    }

    return tokens;
  }