function isWithFaceLandmarks(obj) {
        return isWithFaceDetection(obj)
            && obj['landmarks'] instanceof FaceLandmarks
            && obj['unshiftedLandmarks'] instanceof FaceLandmarks
            && obj['alignedRect'] instanceof FaceDetection;
    }