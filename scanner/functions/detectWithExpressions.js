function detectWithExpressions(event) {
  if (busy) {
    return;
  }

  offscreenCanvasCtx.drawImage(event.data.img, 0, 0);

  const options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 160,
    scoreThreshold: 0.5,
  });
  let detections;
  busy = true;

  if (event.data.getEmotions) {
    detections = faceapi
      .detectSingleFace(offscreenCanvas, options)
      .withFaceLandmarks(true)
      .withFaceExpressions();
  } else {
    detections = faceapi
      .detectSingleFace(offscreenCanvas, options)
      .withFaceLandmarks(true);
  }

  detections.then((dets) => {
    postMessage({ opcode: 1, dets: dets, frame: event.data.frame });
    busy = false;
  });
}