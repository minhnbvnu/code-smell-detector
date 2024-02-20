function onWriteFile(writeErr, fd) {
    if (writeErr) {
      return fo.closeFd(writeErr, fd, onWritten);
    }

    fo.updateMetadata(fd, file, onUpdate);

    function onUpdate(updateErr) {
      fo.closeFd(updateErr, fd, onWritten);
    }
  }