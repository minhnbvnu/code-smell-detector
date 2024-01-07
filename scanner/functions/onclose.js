function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }