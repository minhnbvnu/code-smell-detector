function isSymbolWithNumericName(symbol) {
                var _a2;
                const firstDecl = (_a2 = symbol.declarations) == null ? void 0 : _a2[0];
                return isNumericLiteralName(symbol.escapedName) || firstDecl && isNamedDeclaration(firstDecl) && isNumericName(firstDecl.name);
            }