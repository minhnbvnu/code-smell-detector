function getTopStackFrameString(error) {
    const frames = error.stack.split('\n');
    const frame = frames.length > 1 ? frames[1] : null;
    return frame;
  }