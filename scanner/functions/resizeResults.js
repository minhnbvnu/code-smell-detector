function resizeResults(results, _a) {
        var width = _a.width, height = _a.height;
        if (Array.isArray(results)) {
            return results.map(function (obj) { return resizeResults(obj, { width: width, height: height }); });
        }
        var hasLandmarks = results['unshiftedLandmarks'] && results['unshiftedLandmarks'] instanceof FaceLandmarks;
        var hasDetection = results['detection'] && results['detection'] instanceof FaceDetection;
        if (hasLandmarks) {
            var resizedDetection = results['detection'].forSize(width, height);
            var resizedLandmarks = results['unshiftedLandmarks'].forSize(resizedDetection.box.width, resizedDetection.box.height);
            return extendWithFaceLandmarks(extendWithFaceDetection(results, resizedDetection), resizedLandmarks);
        }
        if (hasDetection) {
            return extendWithFaceDetection(results, results['detection'].forSize(width, height));
        }
        if (results instanceof FaceLandmarks || results instanceof FaceDetection) {
            return results.forSize(width, height);
        }
        return results;
    }