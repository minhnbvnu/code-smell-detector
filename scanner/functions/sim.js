function sim(name, start /*, actions... */) {
    var keys = Array.prototype.slice.call(arguments, 2);
    testCM(name, function(cm) {
      for (var i = 0; i < keys.length; ++i) {
        var cur = keys[i];
        if (cur instanceof Pos) cm.setCursor(cur);
        else if (cur.call) cur(cm);
        else cm.triggerOnKeyDown(fakeEvent(cur));
      }
    }, {keyMap: "emacs", value: start, mode: "javascript"});
  }