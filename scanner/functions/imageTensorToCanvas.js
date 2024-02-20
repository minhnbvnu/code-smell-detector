function imageTensorToCanvas(imgTensor, canvas) {
        return __awaiter$1(this, void 0, void 0, function () {
            var targetCanvas, _a, height, width, numChannels, imgTensor3D;
            return __generator$1(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        targetCanvas = canvas || env.getEnv().createCanvasElement();
                        _a = imgTensor.shape.slice(isTensor4D(imgTensor) ? 1 : 0), height = _a[0], width = _a[1], numChannels = _a[2];
                        imgTensor3D = tidy(function () { return imgTensor.as3D(height, width, numChannels).toInt(); });
                        return [4 /*yield*/, toPixels(imgTensor3D, targetCanvas)];
                    case 1:
                        _b.sent();
                        imgTensor3D.dispose();
                        return [2 /*return*/, targetCanvas];
                }
            });
        });
    }