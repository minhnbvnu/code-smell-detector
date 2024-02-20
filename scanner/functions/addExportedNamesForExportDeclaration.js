function addExportedNamesForExportDeclaration(node) {
                for (const specifier of cast(node.exportClause, isNamedExports).elements) {
                    if (!uniqueExports.get(idText(specifier.name))) {
                        const name = specifier.propertyName || specifier.name;
                        if (!node.moduleSpecifier) {
                            exportSpecifiers.add(idText(name), specifier);
                        }
                        const decl = resolver.getReferencedImportDeclaration(name) || resolver.getReferencedValueDeclaration(name);
                        if (decl) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(decl), specifier.name);
                        }
                        uniqueExports.set(idText(specifier.name), true);
                        exportedNames = append(exportedNames, specifier.name);
                    }
                }
            }