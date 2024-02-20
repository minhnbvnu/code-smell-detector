function visitMergeDeclarationMarker(node) {
                if (hasAssociatedEndOfDeclarationMarker(node) && node.original.kind === 240 /* VariableStatement */) {
                    const id = getOriginalNodeId(node);
                    const isExportedDeclaration = hasSyntacticModifier(node.original, 1 /* Export */);
                    deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node.original, isExportedDeclaration);
                }
                return node;
            }