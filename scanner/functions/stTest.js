function stTest(name) {
    var actions = Array.prototype.slice.call(arguments, 1);
    testCM(name, function(cm) {
      for (var i = 0; i < actions.length; i++) {
        var action = actions[i];
        if (typeof action == "string" && i == 0)
          cm.setValue(action);
        else if (typeof action == "string")
          cm.execCommand(action);
        else if (action instanceof Pos)
          cm.setCursor(action);
        else
          action(cm);
      }
    });
  }