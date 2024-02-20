function areSourceMapsAppliedToErrors() {
  if (sourceMapsAreAppliedToErrors === null) {
    try {
      ErrorTesterCompiled_default()();
      sourceMapsAreAppliedToErrors = false;
    } catch (error) {
      const parsed = error_stack_parser_default.a.parse(error);
      const topStackFrame = parsed[0];
      const lineNumber = topStackFrame.lineNumber;

      if (lineNumber === ErrorTesterCompiled["SOURCE_STACK_FRAME_LINE_NUMBER"]) {
        sourceMapsAreAppliedToErrors = true;
      }
    }
  }

  return sourceMapsAreAppliedToErrors === true;
}