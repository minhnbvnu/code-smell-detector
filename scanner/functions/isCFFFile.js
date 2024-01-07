function isCFFFile(file) {
    const header = file.peekBytes(4);

    if (header[0] >= 1 && header[3] >= 1 && header[3] <= 4) {
      return true;
    }

    return false;
  }