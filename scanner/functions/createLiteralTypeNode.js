function createLiteralTypeNode(literal) {
                const node = createBaseNode(198 /* LiteralType */);
                node.literal = literal;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }