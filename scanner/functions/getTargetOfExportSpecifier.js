function getTargetOfExportSpecifier(node, meaning, dontResolveAlias) {
                if (idText(node.propertyName || node.name) === "default" /* Default */) {
                    const specifier = getModuleSpecifierForImportOrExport(node);
                    const moduleSymbol = specifier && resolveExternalModuleName(node, specifier);
                    if (moduleSymbol) {
                        return getTargetofModuleDefault(moduleSymbol, node, !!dontResolveAlias);
                    }
                }
                const resolved = node.parent.parent.moduleSpecifier ? getExternalModuleMember(node.parent.parent, node, dontResolveAlias) : resolveEntityName(node.propertyName || node.name, meaning, 
                /*ignoreErrors*/
                false, dontResolveAlias);
                markSymbolOfAliasDeclarationIfTypeOnly(node, 
                /*immediateTarget*/
                void 0, resolved, 
                /*overwriteEmpty*/
                false);
                return resolved;
            }