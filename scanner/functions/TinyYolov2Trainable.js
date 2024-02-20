function TinyYolov2Trainable(trainableConfig, optimizer) {
            var _this = _super.call(this, trainableConfig) || this;
            _this._trainableConfig = validateTrainConfig(trainableConfig);
            _this._optimizer = optimizer;
            return _this;
        }