function getTargetOfNamespaceImport(node, dontResolveAlias) {
                const moduleSpecifier = node.parent.parent.moduleSpecifier;
                const immediate = resolveExternalModuleName(node, moduleSpecifier);
                const resolved = resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias, 
                /*suppressUsageError*/
                false);
                markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, 
                /*overwriteEmpty*/
                false);
                return resolved;
            }