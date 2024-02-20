function FaceLandmark68TinyNet(faceFeatureExtractor) {
            if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new TinyFaceFeatureExtractor(); }
            return _super.call(this, 'FaceLandmark68TinyNet', faceFeatureExtractor) || this;
        }