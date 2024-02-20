function isAppInnerRequire() {
  var trace = {};
  Error.captureStackTrace(trace);
  var callerLine = trace.stack.split('\n'); // This line contains 'node_modules' reference for generic libs
  return callerLine[6].indexOf('node_modules') == -1 && callerLine[6].indexOf('ibmapm') == -1;
}