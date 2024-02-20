function isGreatGrandparentRestElement(node) {
                var _a, _b;
                return (((_b = (_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent) != null &&
                    isNodeRestElementInFunction(node.parent.parent.parent));
            }