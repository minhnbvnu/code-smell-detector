function callerFile(offset) {
  var error = new Error();

  return function() {
    var line = (error.stack || '').split('\n')[offset];

    // Clean up the stack trace line
    if (line) {
      if (line.indexOf('@') !== -1) {
        // Firefox
        line = line.substring(line.indexOf('@') + 1);
      } else {
        // Chrome
        line = line.substring(line.indexOf('(') + 1).replace(')', '');
      }
    }

    return line || '';
  };
}