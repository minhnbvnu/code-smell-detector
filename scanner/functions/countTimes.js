function countTimes(func) {
    if (typeof func == "string") func = CodeMirror.commands[func];
    return function(cm) { iterTimes(function () { func(cm); }); };
  }