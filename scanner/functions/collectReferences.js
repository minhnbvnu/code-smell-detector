function collectReferences(sourceFile, ret) {
                if (noResolve || !isUnparsedSource(sourceFile) && isSourceFileJS(sourceFile))
                    return ret;
                forEach(sourceFile.referencedFiles, (f) => {
                    const elem = host.getSourceFileFromReference(sourceFile, f);
                    if (elem) {
                        ret.set(getOriginalNodeId(elem), elem);
                    }
                });
                return ret;
            }