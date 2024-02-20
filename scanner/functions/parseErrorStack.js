function parseErrorStack(e, sourceMaps) {
  if (!e || !e.stack) {
    return [];
  }

  var stack = Array.isArray(e.stack) ? e.stack : stacktraceParser.parse(e.stack);

  var framesToPop = e.framesToPop || 0;
  while (framesToPop--) {
    stack.shift();
  }

  if (sourceMaps) {
    sourceMaps.forEach((sourceMap, index) => {
      stack.forEach(frame => {
        if (frame.file.indexOf(sourceMap.file) !== -1 ||
            frame.file.replace('.map', '.bundle').indexOf(
              sourceMap.file
            ) !== -1) {
          resolveSourceMaps(sourceMap, frame);
        }
      });
    });
  }

  return stack;
}