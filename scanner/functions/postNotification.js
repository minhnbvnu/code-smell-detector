function postNotification(options, cb) {

  options.title = removeColor(options.title);
  options.message = removeColor(options.message);

  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  if (!notifyPlatform) {
    notifyPlatform = choosePlatform();
  }

  function resetPreviousTimer(newMessage) {
    previousMessage = newMessage;
    clearTimeout(previousMessageTimer);
    previousMessageTimer = setTimeout(function(){previousMessage = false;}, previousMessageTimeoutMS);
  }

  if (options.message === previousMessage) {
    resetPreviousTimer(options.message);
    if (typeof cb === 'function') {
      cb();
    }
    return;
  }

  resetPreviousTimer(options.message);

  options.debug = debug(notifyPlatform.name); //for debug logging

  return notifyPlatform.notify(options, function(err){
      if (err) {
        options.debug({
          return_code: err
        });
      }
      if (typeof cb === 'function') {
        cb(err);
      }
    });
}