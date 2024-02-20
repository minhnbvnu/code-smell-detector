function FaceExpressionNet(faceFeatureExtractor) {
            if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new FaceFeatureExtractor(); }
            return _super.call(this, 'FaceExpressionNet', faceFeatureExtractor) || this;
        }