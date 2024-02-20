function watchForContribWatchWarnings(e) {

    if (!e || typeof e !== 'string') {
      return;
    }

    var msg = removeColor(e);
    msg = msg.replace(' Use --force to continue.', '');

    if (msg.indexOf('Warning:') === 0) {
      return notifyHook(msg.replace('Warning: ', ''));
    }
    if (msg.indexOf('Fatal error:') === 0) {
      return notifyHook(msg.replace('Fatal error: ', ''));
    }

    return e;
  }