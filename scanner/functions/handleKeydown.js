function handleKeydown(e) {
      var code = getKeyCode(e);
      if (code === 127) {
        simulateKeyTyped(code, new Char(127));
        return
      }
      if (codedKeys.indexOf(code) < 0) {
        lastPressedKeyCode = code;
        return
      }
      var c = new Char(65535);
      p.key = c;
      p.keyCode = code;
      pressedKeysMap[code] = c;
      p.keyPressed();
      lastPressedKeyCode = null;
      updateKeyPressed();
      return suppressKeyEvent(e)
    }