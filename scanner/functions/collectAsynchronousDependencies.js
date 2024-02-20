function collectAsynchronousDependencies(node, includeNonAmdDependencies) {
                const aliasedModuleNames = [];
                const unaliasedModuleNames = [];
                const importAliasNames = [];
                for (const amdDependency of node.amdDependencies) {
                    if (amdDependency.name) {
                        aliasedModuleNames.push(factory2.createStringLiteral(amdDependency.path));
                        importAliasNames.push(factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, amdDependency.name));
                    }
                    else {
                        unaliasedModuleNames.push(factory2.createStringLiteral(amdDependency.path));
                    }
                }
                for (const importNode of currentModuleInfo.externalImports) {
                    const externalModuleName = getExternalModuleNameLiteral(factory2, importNode, currentSourceFile, host, resolver, compilerOptions);
                    const importAliasName = getLocalNameForExternalImport(factory2, importNode, currentSourceFile);
                    if (externalModuleName) {
                        if (includeNonAmdDependencies && importAliasName) {
                            setEmitFlags(importAliasName, 8 /* NoSubstitution */);
                            aliasedModuleNames.push(externalModuleName);
                            importAliasNames.push(factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, importAliasName));
                        }
                        else {
                            unaliasedModuleNames.push(externalModuleName);
                        }
                    }
                }
                return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
            }