function shouldTrack(obj) {
  if (objectsToTrack.has(obj)) {
    return objectsToTrack.get(obj);
  }

  return (
    obj &&
    (getProto(obj) === Object.prototype || getProto(obj) === Array.prototype)
  );
}