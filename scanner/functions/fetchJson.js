function fetchJson(uri) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchOrThrow(uri)];
                    case 1: return [2 /*return*/, (_a.sent()).json()];
                }
            });
        });
    }