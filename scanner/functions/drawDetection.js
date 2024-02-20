function drawDetection(canvasArg, detection, options) {
        var Canvas = env.getEnv().Canvas;
        var canvas = resolveInput(canvasArg);
        if (!(canvas instanceof Canvas)) {
            throw new Error('drawDetection - expected canvas to be of type: HTMLCanvasElement');
        }
        var detectionArray = Array.isArray(detection)
            ? detection
            : [detection];
        detectionArray.forEach(function (det) {
            var _a = det instanceof ObjectDetection ? det.box : det, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
            var drawOptions = getDefaultDrawOptions(options);
            var ctx = getContext2dOrThrow(canvas);
            drawBox(ctx, x, y, width, height, drawOptions);
            var withScore = drawOptions.withScore;
            var text = det instanceof BoxWithText
                ? det.text
                : ((withScore && det instanceof PredictedBox)
                    ? "" + round$1(det.score)
                    : (det instanceof ObjectDetection
                        ? "" + det.className + (withScore ? " (" + round$1(det.score) + ")" : '')
                        : ''));
            if (text) {
                drawText(ctx, x, y + height, text, drawOptions);
            }
        });
    }