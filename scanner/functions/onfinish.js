function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }