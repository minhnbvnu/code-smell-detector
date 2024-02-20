function emitTripleSlashDirectivesIfNeeded(node) {
                if (node.isDeclarationFile)
                    emitTripleSlashDirectives(node.hasNoDefaultLib, node.referencedFiles, node.typeReferenceDirectives, node.libReferenceDirectives);
            }