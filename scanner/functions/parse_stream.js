function parse_stream(msg) {
  var result = {};
  _.find(msg_regex, (regex, type) => {
    var match  = lazy.XRegExp.exec(msg, regex);

    if (match) {
      result.type = type;
      result.command = match[0];
      result.value = match[1];
      result.input = match.input;

      _.each(regex.xregexp.captureNames, function(key) {
        if (match[key]) {
          result[key] = match[key];
        }
      });
      return true;
    }
  });
  return result;
}