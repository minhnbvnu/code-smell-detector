function tryGetNamedBindingElements(namedImport) {
            var _a2;
            return ((_a2 = namedImport.importClause) == null ? void 0 : _a2.namedBindings) && isNamedImports(namedImport.importClause.namedBindings) ? namedImport.importClause.namedBindings.elements : void 0;
        }