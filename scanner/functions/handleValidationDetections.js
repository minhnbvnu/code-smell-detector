function handleValidationDetections(detections) {
  if (detections) {
    // TODO: Handle CV canvas downres factor?

    const l = detections.landmarks._positions;

    landmarks = new Array();

    for (let i = 0; i < l.length; i += 1) {
      // TODO: Does this break if user webcam dimensions !== 640:480 ?
      landmarks.push([
        l[i]._x * userVideoSprite.scale.x * K_FACE_CV_DOWNRES_FACTOR,
        l[i]._y * userVideoSprite.scale.y * K_FACE_CV_DOWNRES_FACTOR,
      ]);
    }

    if (detections.expressions) {
      if (validationStateFaceData.length < 200000) {
        handleViewerFaceData(
          validateFrame,
          validationStateFaceData,
          landmarks,
          detections.expressions
        );
      }

      emotions = detections.expressions;
    } else {
      if (validationStateFaceData.length < 200000) {
        handleViewerFaceData(
          validateFrame,
          validationStateFaceData,
          landmarks,
          null
        );
      }
    }

    if (K_INSTALLATION_MODE) {
      const faceData = new viewerFaceDataStruct(
        validateFrame,
        landmarks,
        detections.expressions || null
      );
      socket.emit("data", faceData);
    }
  } else {
    landmarks = false;
    emotions = false;

    if (K_INSTALLATION_MODE) {
      socket.emit("data", null);
    }
  }
}