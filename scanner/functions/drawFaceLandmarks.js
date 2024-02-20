function drawFaceLandmarks(canvasArg, faceLandmarks) {
        var faceLandmarksArray = Array.isArray(faceLandmarks) ? faceLandmarks : [faceLandmarks];
        faceLandmarksArray.forEach(function (f) {
            var landmarks = f instanceof FaceLandmarks
                ? f
                : (isWithFaceLandmarks(f) ? f.landmarks : undefined);
            if (!landmarks) {
                throw new Error('drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof');
            }
            new DrawFaceLandmarks(landmarks).draw(canvasArg);
        });
    }