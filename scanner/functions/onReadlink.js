function onReadlink(readErr, target) {
    if (readErr) {
      return onRead(readErr);
    }

    // Store the link target path
    file.symlink = target;

    onRead();
  }