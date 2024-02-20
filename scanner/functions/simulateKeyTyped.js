function simulateKeyTyped(code, c) {
      pressedKeysMap[code] = c;
      lastPressedKeyCode = null;
      p.key = c;
      p.keyCode = code;
      p.keyPressed();
      p.keyCode = 0;
      p.keyTyped();
      updateKeyPressed()
    }