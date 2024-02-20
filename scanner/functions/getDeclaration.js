function getDeclaration(checker, node) {
        var _a;
        const symbol = checker.getSymbolAtLocation(node);
        if (!symbol) {
            return null;
        }
        const declarations = symbol.getDeclarations();
        return (_a = declarations === null || declarations === void 0 ? void 0 : declarations[0]) !== null && _a !== void 0 ? _a : null;
    }