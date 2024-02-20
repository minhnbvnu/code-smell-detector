function FaceProcessor(_name, faceFeatureExtractor) {
            var _this = _super.call(this, _name) || this;
            _this._faceFeatureExtractor = faceFeatureExtractor;
            return _this;
        }