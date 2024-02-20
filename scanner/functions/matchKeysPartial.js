function matchKeysPartial(pressed, mapped) {
      for (var i = 0; i < pressed.length; i++) {
        // 'character' means any character. For mark, register commads, etc.
        if (pressed[i] != mapped[i] && mapped[i] != 'character') {
          return false;
        }
      }
      return true;
    }