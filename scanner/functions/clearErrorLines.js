function clearErrorLines(cm) {
    cm.eachLine(function (line) {
      var has = line.wrapClass && /\bCodeMirror-lint-line-\w+\b/.exec(line.wrapClass);
      if (has) cm.removeLineClass(line, 'wrap', has[0]);
    });
  }