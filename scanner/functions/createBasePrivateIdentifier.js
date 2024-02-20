function createBasePrivateIdentifier(escapedText) {
                const node = baseFactory2.createBasePrivateIdentifierNode(80 /* PrivateIdentifier */);
                node.escapedText = escapedText;
                node.transformFlags |= 16777216 /* ContainsClassFields */;
                return node;
            }