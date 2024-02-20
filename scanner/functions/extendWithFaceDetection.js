function extendWithFaceDetection(sourceObj, detection) {
        var extension = { detection: detection };
        return Object.assign({}, sourceObj, extension);
    }