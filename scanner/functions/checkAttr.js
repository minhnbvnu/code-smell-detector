function checkAttr(qualify, actual, val) {
      switch (qualify) {
      case '=':
        return actual == val;
      case '^=':
        return actual.match(attrCache.g('^=' + val) || attrCache.s('^=' + val, new RegExp('^' + clean(val))));
      case '$=':
        return actual.match(attrCache.g('$=' + val) || attrCache.s('$=' + val, new RegExp(clean(val) + '$')));
      case '*=':
        return actual.match(attrCache.g(val) || attrCache.s(val, new RegExp(clean(val))));
      case '~=':
        return actual.match(attrCache.g('~=' + val) || attrCache.s('~=' + val, new RegExp('(?:^|\\s+)' + clean(val) + '(?:\\s+|$)')));
      case '|=':
        return actual.match(attrCache.g('|=' + val) || attrCache.s('|=' + val, new RegExp('^' + clean(val) + '(-|$)')));
      }
      return 0;
    }