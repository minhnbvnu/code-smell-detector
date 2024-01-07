function timeoutPromise(timeout) {
  return new Promise(function(resolve) {
    global.setTimeout(resolve, timeout);
  });
}