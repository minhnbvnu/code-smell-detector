function wrapperRaf(callback) {
  var delayFrames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var myId = raf_id++;
  var restFrames = delayFrames;
  function internalCallback() {
    restFrames -= 1;
    if (restFrames <= 0) {
      callback();
      delete ids[myId];
    } else {
      ids[myId] = _raf_3_4_1_raf_default()(internalCallback);
    }
  }
  ids[myId] = _raf_3_4_1_raf_default()(internalCallback);
  return myId;
}