function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }