function getExports(name) {
                let exportedNames;
                if (!isGeneratedIdentifier(name)) {
                    const valueDeclaration = resolver.getReferencedImportDeclaration(name) || resolver.getReferencedValueDeclaration(name);
                    if (valueDeclaration) {
                        const exportContainer = resolver.getReferencedExportContainer(name, 
                        /*prefixLocals*/
                        false);
                        if (exportContainer && exportContainer.kind === 308 /* SourceFile */) {
                            exportedNames = append(exportedNames, factory2.getDeclarationName(valueDeclaration));
                        }
                        exportedNames = addRange(exportedNames, moduleInfo && moduleInfo.exportedBindings[getOriginalNodeId(valueDeclaration)]);
                    }
                }
                return exportedNames;
            }