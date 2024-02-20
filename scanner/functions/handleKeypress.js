function handleKeypress(e) {
      if (lastPressedKeyCode === null) return;
      var code = lastPressedKeyCode,
        c = getKeyChar(e);
      simulateKeyTyped(code, c);
      return suppressKeyEvent(e)
    }