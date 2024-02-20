function createTextType(fromNewline, toNewline) {
  let result = {
    matches: /.*/,

    fromICAL: function(aValue, structuredEscape) {
      return replaceNewline(aValue, fromNewline, structuredEscape);
    },

    toICAL: function(aValue, structuredEscape) {
      let regEx = toNewline;
      if (structuredEscape)
         regEx = new RegExp(regEx.source + '|' + structuredEscape, regEx.flags);
      return aValue.replace(regEx, function(str) {
        switch (str) {
        case "\\":
          return "\\\\";
        case ";":
          return "\\;";
        case ",":
          return "\\,";
        case "\n":
          return "\\n";
        /* c8 ignore next 2 */
        default:
          return str;
        }
      });
    }
  };
  return result;
}