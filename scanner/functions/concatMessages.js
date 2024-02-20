function concatMessages(args) {
  var msg = '', arg;
  for (var i=0; i<args.length; i++) {
    arg = args[i];
    if (msg.length > 0) msg += ' ';
    if (typeof arg == 'object') {
      try {
        // json2.json implementation throws error if object contains a cycle
        // and many Illustrator objects have cycles.
        msg += JSON.stringify(arg);
      } catch(e) {
        msg += String(arg);
      }
    } else {
      msg += arg;
    }
  }
  return msg;
}