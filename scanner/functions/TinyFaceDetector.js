function TinyFaceDetector() {
            var _this = this;
            var config = {
                withSeparableConvs: true,
                iouThreshold: IOU_THRESHOLD,
                classes: ['face'],
                anchors: BOX_ANCHORS,
                meanRgb: MEAN_RGB,
                isFirstLayerConv2d: true,
                filterSizes: [3, 16, 32, 64, 128, 256, 512]
            };
            _this = _super.call(this, config) || this;
            return _this;
        }