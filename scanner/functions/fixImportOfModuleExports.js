function fixImportOfModuleExports(importingFile, exportingFile, changes, quotePreference) {
            for (const moduleSpecifier of importingFile.imports) {
                const imported = getResolvedModule(importingFile, moduleSpecifier.text, getModeForUsageLocation(importingFile, moduleSpecifier));
                if (!imported || imported.resolvedFileName !== exportingFile.fileName) {
                    continue;
                }
                const importNode = importFromModuleSpecifier(moduleSpecifier);
                switch (importNode.kind) {
                    case 268 /* ImportEqualsDeclaration */:
                        changes.replaceNode(importingFile, importNode, makeImport(importNode.name, 
                        /*namedImports*/
                        void 0, moduleSpecifier, quotePreference));
                        break;
                    case 210 /* CallExpression */:
                        if (isRequireCall(importNode, 
                        /*checkArgumentIsStringLiteralLike*/
                        false)) {
                            changes.replaceNode(importingFile, importNode, factory.createPropertyAccessExpression(getSynthesizedDeepClone(importNode), "default"));
                        }
                        break;
                }
            }
        }