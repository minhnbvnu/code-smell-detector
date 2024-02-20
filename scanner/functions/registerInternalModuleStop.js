function registerInternalModuleStop(error) {
    if (openModuleRangesStack.length > 0) {
      const startStackFrame = openModuleRangesStack.pop();
      const stopStackFrame = getTopStackFrameString(error);

      if (stopStackFrame !== null) {
        moduleRanges.push([startStackFrame, stopStackFrame]);
      }
    }
  }