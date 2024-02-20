function extractFaceTensors(imageTensor, detections) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                if (!isTensor3D(imageTensor) && !isTensor4D(imageTensor)) {
                    throw new Error('extractFaceTensors - expected image tensor to be 3D or 4D');
                }
                if (isTensor4D(imageTensor) && imageTensor.shape[0] > 1) {
                    throw new Error('extractFaceTensors - batchSize > 1 not supported');
                }
                return [2 /*return*/, tidy(function () {
                        var _a = imageTensor.shape.slice(isTensor4D(imageTensor) ? 1 : 0), imgHeight = _a[0], imgWidth = _a[1], numChannels = _a[2];
                        var boxes = detections.map(function (det) { return det instanceof FaceDetection
                            ? det.forSize(imgWidth, imgHeight).box
                            : det; })
                            .map(function (box) { return box.clipAtImageBorders(imgWidth, imgHeight); });
                        var faceTensors = boxes.map(function (_a) {
                            var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                            return slice3d(imageTensor.as3D(imgHeight, imgWidth, numChannels), [y, x, 0], [height, width, numChannels]);
                        });
                        return faceTensors;
                    })];
            });
        });
    }