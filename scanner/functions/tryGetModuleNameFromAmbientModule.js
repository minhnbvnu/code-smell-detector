function tryGetModuleNameFromAmbientModule(moduleSymbol, checker) {
            var _a2;
            const decl = (_a2 = moduleSymbol.declarations) == null ? void 0 : _a2.find((d) => isNonGlobalAmbientModule(d) && (!isExternalModuleAugmentation(d) || !isExternalModuleNameRelative(getTextOfIdentifierOrLiteral(d.name))));
            if (decl) {
                return decl.name.text;
            }
            const ambientModuleDeclareCandidates = mapDefined(moduleSymbol.declarations, (d) => {
                var _a3, _b, _c, _d;
                if (!isModuleDeclaration(d))
                    return;
                const topNamespace = getTopNamespace(d);
                if (!(((_a3 = topNamespace == null ? void 0 : topNamespace.parent) == null ? void 0 : _a3.parent) && isModuleBlock(topNamespace.parent) && isAmbientModule(topNamespace.parent.parent) && isSourceFile(topNamespace.parent.parent.parent)))
                    return;
                const exportAssignment = (_d = (_c = (_b = topNamespace.parent.parent.symbol.exports) == null ? void 0 : _b.get("export=")) == null ? void 0 : _c.valueDeclaration) == null ? void 0 : _d.expression;
                if (!exportAssignment)
                    return;
                const exportSymbol = checker.getSymbolAtLocation(exportAssignment);
                if (!exportSymbol)
                    return;
                const originalExportSymbol = (exportSymbol == null ? void 0 : exportSymbol.flags) & 2097152 /* Alias */ ? checker.getAliasedSymbol(exportSymbol) : exportSymbol;
                if (originalExportSymbol === d.symbol)
                    return topNamespace.parent.parent;
                function getTopNamespace(namespaceDeclaration) {
                    while (namespaceDeclaration.flags & 4 /* NestedNamespace */) {
                        namespaceDeclaration = namespaceDeclaration.parent;
                    }
                    return namespaceDeclaration;
                }
            });
            const ambientModuleDeclare = ambientModuleDeclareCandidates[0];
            if (ambientModuleDeclare) {
                return ambientModuleDeclare.name.text;
            }
        }