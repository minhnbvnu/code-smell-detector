function getFrameObjects(frames, frameNumber) {
  if (frames instanceof Map) {
    return frames.get(frameNumber);
  }
  if (frames instanceof Array) {
    return frames[frameNumber];
  }
  return null;
}