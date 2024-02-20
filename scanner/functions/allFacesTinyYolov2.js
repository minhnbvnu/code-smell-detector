function allFacesTinyYolov2(input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, detectAllFaces(input, new TinyYolov2Options(forwardParams))
                            .withFaceLandmarks()
                            .withFaceDescriptors()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }