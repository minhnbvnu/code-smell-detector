function getExportEqualsLocalSymbol(importedSymbol, checker) {
            var _a2, _b;
            if (importedSymbol.flags & 2097152 /* Alias */) {
                return checker.getImmediateAliasedSymbol(importedSymbol);
            }
            const decl = Debug.checkDefined(importedSymbol.valueDeclaration);
            if (isExportAssignment(decl)) {
                return (_a2 = tryCast(decl.expression, canHaveSymbol)) == null ? void 0 : _a2.symbol;
            }
            else if (isBinaryExpression(decl)) {
                return (_b = tryCast(decl.right, canHaveSymbol)) == null ? void 0 : _b.symbol;
            }
            else if (isSourceFile(decl)) {
                return decl.symbol;
            }
            return void 0;
        }