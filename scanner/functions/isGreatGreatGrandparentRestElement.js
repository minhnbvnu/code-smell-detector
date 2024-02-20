function isGreatGreatGrandparentRestElement(node) {
                var _a, _b, _c;
                return (((_c = (_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.parent) != null &&
                    isNodeValidTSType(node.parent.parent) &&
                    isNodeRestElementInFunction(node.parent.parent.parent.parent));
            }