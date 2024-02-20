function updateKeyPressed() {
      var ch;
      for (ch in pressedKeysMap) if (pressedKeysMap.hasOwnProperty(ch)) {
        p.__keyPressed = true;
        return
      }
      p.__keyPressed = false
    }