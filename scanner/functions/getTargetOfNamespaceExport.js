function getTargetOfNamespaceExport(node, dontResolveAlias) {
                const moduleSpecifier = node.parent.moduleSpecifier;
                const immediate = moduleSpecifier && resolveExternalModuleName(node, moduleSpecifier);
                const resolved = moduleSpecifier && resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias, 
                /*suppressUsageError*/
                false);
                markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, 
                /*overwriteEmpty*/
                false);
                return resolved;
            }