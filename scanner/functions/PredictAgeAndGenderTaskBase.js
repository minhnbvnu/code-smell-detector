function PredictAgeAndGenderTaskBase(parentTask, input, extractedFaces) {
            var _this = _super.call(this) || this;
            _this.parentTask = parentTask;
            _this.input = input;
            _this.extractedFaces = extractedFaces;
            return _this;
        }