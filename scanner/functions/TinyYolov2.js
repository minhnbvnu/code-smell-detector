function TinyYolov2(config) {
            var _this = _super.call(this, 'TinyYolov2') || this;
            validateConfig(config);
            _this._config = config;
            return _this;
        }