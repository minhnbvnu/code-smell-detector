function _JS_WebCamVideo_CanPlay(deviceId){var webcam=activeWebCams[deviceId];return webcam&&webcam.video.videoWidth>0&&webcam.video.videoHeight>0}