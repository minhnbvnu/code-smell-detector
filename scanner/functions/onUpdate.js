function onUpdate(updateErr) {
      fo.closeFd(updateErr, fd, onWritten);
    }