function emitSyntheticTripleSlashReferencesIfNeeded(node) {
                emitTripleSlashDirectives(!!node.hasNoDefaultLib, node.syntheticFileReferences || [], node.syntheticTypeReferences || [], node.syntheticLibReferences || []);
                for (const prepend of node.prepends) {
                    if (isUnparsedSource(prepend) && prepend.syntheticReferences) {
                        for (const ref of prepend.syntheticReferences) {
                            emit(ref);
                            writeLine();
                        }
                    }
                }
            }