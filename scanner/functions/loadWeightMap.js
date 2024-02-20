function loadWeightMap(uri, defaultModelName) {
        return __awaiter$1(this, void 0, void 0, function () {
            var _a, manifestUri, modelBaseUri, manifest;
            return __generator$1(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getModelUris(uri, defaultModelName), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                        return [4 /*yield*/, fetchJson(manifestUri)];
                    case 1:
                        manifest = _b.sent();
                        return [2 /*return*/, io.loadWeights(manifest, modelBaseUri)];
                }
            });
        });
    }