function handlePlayDetections(detections, cachedFrame) {
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

    if (detections.expressions && getLandmarks) {
      handleViewerFaceData(
        cachedFrame,
        viewerFaceData,
        landmarks,
        detections.expressions
      );
      emotions = detections.expressions;
    } else if (detections.expressions && !getLandmarks) {
      handleViewerFaceData(
        cachedFrame,
        viewerFaceData,
        null,
        detections.expressions
      );
      emotions = detections.expressions;
    } else if (!detections.expressions && getLandmarks) {
      handleViewerFaceData(cachedFrame, viewerFaceData, landmarks, null);
    }

    if (K_INSTALLATION_MODE) {
      const faceData = new viewerFaceDataStruct(
        cachedFrame,
        landmarks,
        detections.expressions || null
      );
      socket.emit("data", faceData);
    }

    userVideoStatusText.visible = false;
  } else {
    landmarks = false;
    emotions = false;
    userVideoStatusText.visible = true;

    if (K_INSTALLATION_MODE) {
      socket.emit("data", null);
    }
  }
}