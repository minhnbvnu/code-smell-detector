function DrawFaceLandmarksOptions(options) {
            if (options === void 0) { options = {}; }
            var _a = options.drawLines, drawLines = _a === void 0 ? true : _a, _b = options.drawPoints, drawPoints = _b === void 0 ? true : _b, lineWidth = options.lineWidth, lineColor = options.lineColor, pointSize = options.pointSize, pointColor = options.pointColor;
            this.drawLines = drawLines;
            this.drawPoints = drawPoints;
            this.lineWidth = lineWidth || 1;
            this.pointSize = pointSize || 2;
            this.lineColor = lineColor || 'rgba(0, 255, 255, 1)';
            this.pointColor = pointColor || 'rgba(255, 0, 255, 1)';
        }