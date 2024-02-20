function getSymbol2(node) {
                var _a2, _b;
                return (_b = (_a2 = tryCast(node, canHaveSymbol)) == null ? void 0 : _a2.symbol) != null ? _b : transformer.checker.getSymbolAtLocation(node);
            }