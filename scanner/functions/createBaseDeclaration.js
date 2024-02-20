function createBaseDeclaration(kind) {
                const node = createBaseNode(kind);
                node.symbol = void 0;
                node.localSymbol = void 0;
                return node;
            }