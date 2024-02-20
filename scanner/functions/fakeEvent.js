function fakeEvent(keyName) {
    var event = eventCache[key];
    if (event) return event;

    var ctrl, shift, alt;
    var key = keyName.replace(/\w+-/g, function(type) {
      if (type == "Ctrl-") ctrl = true;
      else if (type == "Alt-") alt = true;
      else if (type == "Shift-") shift = true;
      return "";
    });
    var code;
    for (var c in CodeMirror.keyNames)
      if (CodeMirror.keyNames[c] == key) { code = c; break; }
    if (code == null) throw new Error("Unknown key: " + key);

    return eventCache[keyName] = {
      type: "keydown", keyCode: code, ctrlKey: ctrl, shiftKey: shift, altKey: alt,
      preventDefault: function(){}, stopPropagation: function(){}
    };
  }