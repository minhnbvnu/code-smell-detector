function getDefaultLikeExportNameFromDeclaration(symbol) {
            return firstDefined(symbol.declarations, (d) => {
                var _a2, _b;
                return isExportAssignment(d) ? (_a2 = tryCast(skipOuterExpressions(d.expression), isIdentifier)) == null ? void 0 : _a2.text : (_b = tryCast(getNameOfDeclaration(d), isIdentifier)) == null ? void 0 : _b.text;
            });
        }