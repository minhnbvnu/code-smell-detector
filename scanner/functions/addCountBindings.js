function addCountBindings(keyMap) {
    // Add bindings for number keys
    keyMap["0"] = function(cm) {
      count.length > 0 ? pushCountDigit("0")(cm) : CodeMirror.commands.goLineStart(cm);
    };
    for (var i = 1; i < 10; ++i) keyMap[i] = pushCountDigit(i);
  }