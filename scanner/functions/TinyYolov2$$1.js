function TinyYolov2$$1(withSeparableConvs) {
            if (withSeparableConvs === void 0) { withSeparableConvs = true; }
            var _this = this;
            var config = Object.assign({}, {
                withSeparableConvs: withSeparableConvs,
                iouThreshold: IOU_THRESHOLD$1,
                classes: ['face']
            }, withSeparableConvs
                ? {
                    anchors: BOX_ANCHORS_SEPARABLE,
                    meanRgb: MEAN_RGB_SEPARABLE
                }
                : {
                    anchors: BOX_ANCHORS$1,
                    withClassScores: true
                });
            _this = _super.call(this, config) || this;
            return _this;
        }