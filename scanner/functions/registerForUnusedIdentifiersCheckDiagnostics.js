function registerForUnusedIdentifiersCheckDiagnostics() {
                    const sourceFile = getSourceFileOfNode(node);
                    let potentiallyUnusedIdentifiers = allPotentiallyUnusedIdentifiers.get(sourceFile.path);
                    if (!potentiallyUnusedIdentifiers) {
                        potentiallyUnusedIdentifiers = [];
                        allPotentiallyUnusedIdentifiers.set(sourceFile.path, potentiallyUnusedIdentifiers);
                    }
                    potentiallyUnusedIdentifiers.push(node);
                }