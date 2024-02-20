function getSymbolOfClassLikeDeclaration(node, checker) {
        var _a;
        return checker.getSymbolAtLocation((_a = node.name) !== null && _a !== void 0 ? _a : util_1.getChildOfKind(node, ts.SyntaxKind.ClassKeyword));
    }