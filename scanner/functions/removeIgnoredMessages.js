function removeIgnoredMessages() {
    var ignored = state.ignoredLines;

    if (_.isEmpty(ignored)) return;
    JSHINT.errors = _.reject(JSHINT.errors, function(err) { return ignored[err.line] });
  }