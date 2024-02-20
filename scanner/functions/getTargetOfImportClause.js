function getTargetOfImportClause(node, dontResolveAlias) {
                const moduleSymbol = resolveExternalModuleName(node, node.parent.moduleSpecifier);
                if (moduleSymbol) {
                    return getTargetofModuleDefault(moduleSymbol, node, dontResolveAlias);
                }
            }