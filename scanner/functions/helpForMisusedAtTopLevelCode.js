function helpForMisusedAtTopLevelCode(e, log) {
  if (!log) {
    log = console.log.bind(console);
  }

  if (!misusedAtTopLevelCode) {
    defineMisusedAtTopLevelCode();
  }

  // If we find that we're logging lots of false positives, we can
  // uncomment the following code to avoid displaying anything if the
  // user's code isn't likely to be using p5's global mode. (Note that
  // setup/draw are more likely to be defined due to JS function hoisting.)
  //
  //if (!('setup' in window || 'draw' in window)) {
  //  return;
  //}

  misusedAtTopLevelCode.some(function(symbol) {
    // Note that while just checking for the occurrence of the
    // symbol name in the error message could result in false positives,
    // a more rigorous test is difficult because different browsers
    // log different messages, and the format of those messages may
    // change over time.
    //
    // For example, if the user uses 'PI' in their code, it may result
    // in any one of the following messages:
    //
    //   * 'PI' is undefined                           (Microsoft Edge)
    //   * ReferenceError: PI is undefined             (Firefox)
    //   * Uncaught ReferenceError: PI is not defined  (Chrome)

    if (e.message && e.message.match('\\W?'+symbol.name+'\\W') !== null) {
      log('%cDid you just try to use p5.js\'s ' + symbol.name +
          (symbol.type === 'function' ? '() ' : ' ') + symbol.type +
          '? If so, you may want to ' +
          'move it into your sketch\'s setup() function.\n\n' +
          'For more details, see: ' + FAQ_URL,
          'color: #B40033' /* Dark magenta */);
      return true;
    }
  });
}