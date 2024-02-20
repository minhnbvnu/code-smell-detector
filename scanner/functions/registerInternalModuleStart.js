function registerInternalModuleStart(error) {
    const startStackFrame = getTopStackFrameString(error);

    if (startStackFrame !== null) {
      openModuleRangesStack.push(startStackFrame);
    }
  }