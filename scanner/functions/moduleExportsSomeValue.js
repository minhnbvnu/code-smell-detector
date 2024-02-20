function moduleExportsSomeValue(moduleReferenceExpression) {
                let moduleSymbol = resolveExternalModuleName(moduleReferenceExpression.parent, moduleReferenceExpression);
                if (!moduleSymbol || isShorthandAmbientModuleSymbol(moduleSymbol)) {
                    return true;
                }
                const hasExportAssignment = hasExportAssignmentSymbol(moduleSymbol);
                moduleSymbol = resolveExternalModuleSymbol(moduleSymbol);
                const symbolLinks2 = getSymbolLinks(moduleSymbol);
                if (symbolLinks2.exportsSomeValue === void 0) {
                    symbolLinks2.exportsSomeValue = hasExportAssignment ? !!(moduleSymbol.flags & 111551 /* Value */) : forEachEntry(getExportsOfModule(moduleSymbol), isValue);
                }
                return symbolLinks2.exportsSomeValue;
                function isValue(s) {
                    s = resolveSymbol(s);
                    return s && !!(getAllSymbolFlags(s) & 111551 /* Value */);
                }
            }