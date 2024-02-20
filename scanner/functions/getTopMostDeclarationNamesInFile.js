function getTopMostDeclarationNamesInFile(declarationName, sourceFile) {
                        const candidates = filter(getPossibleSymbolReferenceNodes(sourceFile, declarationName), (name) => !!getDeclarationFromName(name));
                        return candidates.reduce((topMost, decl) => {
                            const depth = getDepth(decl);
                            if (!some(topMost.declarationNames) || depth === topMost.depth) {
                                topMost.declarationNames.push(decl);
                                topMost.depth = depth;
                            }
                            else if (depth < topMost.depth) {
                                topMost.declarationNames = [decl];
                                topMost.depth = depth;
                            }
                            return topMost;
                        }, { depth: Infinity, declarationNames: [] }).declarationNames;
                        function getDepth(declaration) {
                            let depth = 0;
                            while (declaration) {
                                declaration = getContainerNode(declaration);
                                depth++;
                            }
                            return depth;
                        }
                    }