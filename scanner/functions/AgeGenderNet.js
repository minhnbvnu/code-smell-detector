function AgeGenderNet(faceFeatureExtractor) {
            if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new TinyXception(2); }
            var _this = _super.call(this, 'AgeGenderNet') || this;
            _this._faceFeatureExtractor = faceFeatureExtractor;
            return _this;
        }