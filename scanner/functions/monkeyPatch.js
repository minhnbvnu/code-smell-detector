function monkeyPatch(env) {
        if (!environment$1) {
            initialize();
        }
        if (!environment$1) {
            throw new Error('monkeyPatch - environment is not defined, check isNodejs() and isBrowser()');
        }
        var _a = env.Canvas, Canvas = _a === void 0 ? environment$1.Canvas : _a, _b = env.Image, Image = _b === void 0 ? environment$1.Image : _b;
        environment$1.Canvas = Canvas;
        environment$1.Image = Image;
        environment$1.createCanvasElement = env.createCanvasElement || (function () { return new Canvas(); });
        environment$1.createImageElement = env.createImageElement || (function () { return new Image(); });
        environment$1.ImageData = env.ImageData || environment$1.ImageData;
        environment$1.Video = env.Video || environment$1.Video;
        environment$1.fetch = env.fetch || environment$1.fetch;
        environment$1.readFile = env.readFile || environment$1.readFile;
    }