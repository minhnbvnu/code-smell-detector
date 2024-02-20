function isDragging() {
    for (var b in buttons) {
      if (has.call(buttons, b) && buttons[b]) return true;
    }
    return false;
  }