function subMode(lexem, mode) {
      for (var i = 0; i < mode.contains.length; i++) {
        var match = mode.contains[i].beginRe.exec(lexem);
        if (match && match.index == 0) {
          return mode.contains[i];
        }
      }
    }