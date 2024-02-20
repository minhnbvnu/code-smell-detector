function destructuringPatternMatch(tokens, value) {
    var first = value.first;

    if (!first)
      return;

    _.zip(tokens, Array.isArray(first) ? first : [ first ]).forEach(function(val) {
      var token = val[0];
      var value = val[1];

      if (token && value)
        token.first = value;
      else if (token && token.first && !value)
        warning("W080", token.first, token.first.value);
    });
  }