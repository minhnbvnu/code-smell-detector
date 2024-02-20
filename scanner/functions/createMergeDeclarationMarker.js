function createMergeDeclarationMarker(original) {
                const node = createBaseNode(358 /* MergeDeclarationMarker */);
                node.emitNode = {};
                node.original = original;
                return node;
            }