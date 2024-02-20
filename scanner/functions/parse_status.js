function parse_status(msg) {
  var result = { type: "unknown", msg };

  _.find(msg_regex, (regexs, type) => {
    regexs = _.isArray(regexs) ? regexs : [regexs];
    return _.find(regexs, (regex) => {
      // Cache regex
      regex = lazy.XRegExp.cache(regex);
      var match = lazy.XRegExp.exec(msg, regex);
      if (match) {
        result.type = type;
        _.each(regex.xregexp.captureNames, function(key) {
          if (match[key]) {
            result[key] = match[key];
          }
        });
        return true;
      }
    });
  });

  return result;
}