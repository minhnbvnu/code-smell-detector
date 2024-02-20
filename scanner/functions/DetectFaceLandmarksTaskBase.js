function DetectFaceLandmarksTaskBase(parentTask, input, useTinyLandmarkNet) {
            var _this = _super.call(this) || this;
            _this.parentTask = parentTask;
            _this.input = input;
            _this.useTinyLandmarkNet = useTinyLandmarkNet;
            return _this;
        }