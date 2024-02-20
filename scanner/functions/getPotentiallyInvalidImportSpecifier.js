function getPotentiallyInvalidImportSpecifier(namedBindings) {
            var _a2;
            return find((_a2 = tryCast(namedBindings, isNamedImports)) == null ? void 0 : _a2.elements, (e) => {
                var _a3;
                return !e.propertyName && isStringANonContextualKeyword(e.name.text) && ((_a3 = findPrecedingToken(e.name.pos, namedBindings.getSourceFile(), namedBindings)) == null ? void 0 : _a3.kind) !== 27 /* CommaToken */;
            });
        }