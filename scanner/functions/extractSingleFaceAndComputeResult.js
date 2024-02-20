function extractSingleFaceAndComputeResult(parentResult, input, computeResult, extractedFaces, getRectForAlignment) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, extractAllFacesAndComputeResults([parentResult], input, function (faces) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, computeResult(faces[0])];
                    }); }); }, extractedFaces, getRectForAlignment)];
            });
        });
    }