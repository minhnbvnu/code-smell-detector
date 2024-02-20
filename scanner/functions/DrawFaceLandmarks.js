function DrawFaceLandmarks(faceLandmarks, options) {
            if (options === void 0) { options = {}; }
            this.faceLandmarks = faceLandmarks;
            this.options = new DrawFaceLandmarksOptions(options);
        }