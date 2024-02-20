function isSymbolWithSymbolName(symbol) {
                var _a2;
                const firstDecl = (_a2 = symbol.declarations) == null ? void 0 : _a2[0];
                return isKnownSymbol(symbol) || firstDecl && isNamedDeclaration(firstDecl) && isComputedPropertyName(firstDecl.name) && isTypeAssignableToKind(checkComputedPropertyName(firstDecl.name), 4096 /* ESSymbol */);
            }