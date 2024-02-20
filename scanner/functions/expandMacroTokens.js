function expandMacroTokens(tokens, locale) {
    var _Array$prototype;

    return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function (t) {
      return maybeExpandMacroToken(t, locale);
    }));
  }