function getObjectMotions(targetObject, objectFrames, startFrame, endFrame) {
  startFrame = Math.max(targetObject.firstFrame, startFrame);
  endFrame = Math.min(targetObject.lastFrame, endFrame);

  const motions = [];
  for (let i = startFrame; i < endFrame; i++) {
    const objects = getFrameObjects(objectFrames, i);
    const object = objects.find(obj => obj.id === targetObject.id);
    motions.push(object);
  }

  return motions;
}