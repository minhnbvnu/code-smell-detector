function shouldIgnoreFunction(callFrame) {
  const {
    functionName,
    url
  } = callFrame;

  if (url === 'native dummy.js') {
    // I'm not really sure what this is about, but this seems to be used
    // as a way of avoiding edge cases in V8's implementation.
    // See: https://github.com/v8/v8/blob/b8626ca4/tools/js2c.py#L419-L424
    return true;
  }

  return functionName === '(root)' || functionName === '(idle)';
}