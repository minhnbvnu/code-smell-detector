function getAlternativeContainingModules(symbol, enclosingDeclaration) {
                const containingFile = getSourceFileOfNode(enclosingDeclaration);
                const id = getNodeId(containingFile);
                const links = getSymbolLinks(symbol);
                let results;
                if (links.extendedContainersByFile && (results = links.extendedContainersByFile.get(id))) {
                    return results;
                }
                if (containingFile && containingFile.imports) {
                    for (const importRef of containingFile.imports) {
                        if (nodeIsSynthesized(importRef))
                            continue;
                        const resolvedModule = resolveExternalModuleName(enclosingDeclaration, importRef, 
                        /*ignoreErrors*/
                        true);
                        if (!resolvedModule)
                            continue;
                        const ref = getAliasForSymbolInContainer(resolvedModule, symbol);
                        if (!ref)
                            continue;
                        results = append(results, resolvedModule);
                    }
                    if (length(results)) {
                        (links.extendedContainersByFile || (links.extendedContainersByFile = /* @__PURE__ */ new Map())).set(id, results);
                        return results;
                    }
                }
                if (links.extendedContainers) {
                    return links.extendedContainers;
                }
                const otherFiles = host.getSourceFiles();
                for (const file of otherFiles) {
                    if (!isExternalModule(file))
                        continue;
                    const sym = getSymbolOfDeclaration(file);
                    const ref = getAliasForSymbolInContainer(sym, symbol);
                    if (!ref)
                        continue;
                    results = append(results, sym);
                }
                return links.extendedContainers = results || emptyArray;
            }