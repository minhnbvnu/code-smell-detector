function createEndOfDeclarationMarker(original) {
                const node = createBaseNode(359 /* EndOfDeclarationMarker */);
                node.emitNode = {};
                node.original = original;
                return node;
            }