function updateSoon() {
    if (!pending) {
      pending = true;
      setTimeout(update, 250);
    }
  }