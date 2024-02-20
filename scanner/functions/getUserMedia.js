function getUserMedia(constraints) {
  if (constraints.audio) {
    return Promise.resolve(new MicrophoneMediaStream());
  } else if (constraints.video) {
    const dev = new VideoDevice();
    dev.constraints = constraints.video;
    return Promise.resolve(dev);
  } else {
    return Promise.reject(new Error('constraints not met'));
  }
}