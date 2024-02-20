function parseStackFrame(stackFrame) {
  const error = new Error();
  error.stack = stackFrame;
  const frames = error_stack_parser_default.a.parse(error);
  return frames.length === 1 ? frames[0] : null;
}