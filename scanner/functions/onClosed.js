function onClosed(closeErr) {
    if (propagatedErr || closeErr) {
      return callback(propagatedErr || closeErr);
    }

    callback();
  }