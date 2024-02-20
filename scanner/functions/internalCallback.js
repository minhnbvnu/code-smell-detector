function internalCallback() {
    restFrames -= 1;
    if (restFrames <= 0) {
      callback();
      delete ids[myId];
    } else {
      ids[myId] = _raf_3_4_1_raf_default()(internalCallback);
    }
  }