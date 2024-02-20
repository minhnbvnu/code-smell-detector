function visitEndOfDeclarationMarker(node) {
                const id = getOriginalNodeId(node);
                const statements = deferredExports[id];
                if (statements) {
                    delete deferredExports[id];
                    return append(statements, node);
                }
                else {
                    const original = getOriginalNode(node);
                    if (isModuleOrEnumDeclaration(original)) {
                        return append(appendExportsOfDeclaration(statements, original), node);
                    }
                }
                return node;
            }