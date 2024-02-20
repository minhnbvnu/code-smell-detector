function getNameForExportDefault(symbol) {
            return symbol.declarations && firstDefined(symbol.declarations, (declaration) => {
                var _a2;
                if (isExportAssignment(declaration)) {
                    return (_a2 = tryCast(skipOuterExpressions(declaration.expression), isIdentifier)) == null ? void 0 : _a2.text;
                }
                else if (isExportSpecifier(declaration)) {
                    Debug.assert(declaration.name.text === "default" /* Default */, "Expected the specifier to be a default export");
                    return declaration.propertyName && declaration.propertyName.text;
                }
            });
        }