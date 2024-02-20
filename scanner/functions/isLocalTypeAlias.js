function isLocalTypeAlias(symbol) {
                var _a2;
                const declaration = (_a2 = symbol.declarations) == null ? void 0 : _a2.find(isTypeAlias);
                return !!(declaration && getContainingFunction(declaration));
            }