function isImportRequiredByAugmentation(node) {
                    const file = getSourceFileOfNode(node);
                    if (!file.symbol)
                        return false;
                    const importTarget = getExternalModuleFileFromDeclaration(node);
                    if (!importTarget)
                        return false;
                    if (importTarget === file)
                        return false;
                    const exports = getExportsOfModule(file.symbol);
                    for (const s of arrayFrom(exports.values())) {
                        if (s.mergeId) {
                            const merged = getMergedSymbol(s);
                            if (merged.declarations) {
                                for (const d of merged.declarations) {
                                    const declFile = getSourceFileOfNode(d);
                                    if (declFile === importTarget) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                }