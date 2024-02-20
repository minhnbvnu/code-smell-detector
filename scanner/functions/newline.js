function newline(m) {
    if (options.newline) {
      callback('display', -1);
    } else {
      callback('text', m);
    }

    return '';
  }