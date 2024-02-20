function shouldMouseOutCancel(e) {
      // Events are stupid
      return !(e.target === camera || e.relatedTarget === camera) && Cursor.isDown;
    }