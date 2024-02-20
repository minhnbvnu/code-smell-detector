function createBaseIdentifier(escapedText) {
                const node = baseFactory2.createBaseIdentifierNode(79 /* Identifier */);
                node.escapedText = escapedText;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                node.symbol = void 0;
                return node;
            }