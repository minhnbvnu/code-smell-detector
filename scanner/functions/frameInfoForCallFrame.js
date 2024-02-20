function frameInfoForCallFrame(callFrame) {
  return utils_1.getOrInsert(callFrameToFrameInfo, callFrame, callFrame => {
    const name = callFrame.functionName || '(anonymous)';
    const file = callFrame.url;
    const line = callFrame.lineNumber;
    const col = callFrame.columnNumber;
    return {
      key: `${name}:${file}:${line}:${col}`,
      name,
      file,
      line,
      col
    };
  });
}