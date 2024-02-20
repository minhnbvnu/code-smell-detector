function onMkdirp(mkdirpErr) {
    if (mkdirpErr) {
      return onWritten(mkdirpErr);
    }

    fs.open(file.path, 'r', onOpen);
  }