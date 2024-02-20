function createTypeLiteralNode(members) {
                const node = createBaseDeclaration(184 /* TypeLiteral */);
                node.members = createNodeArray(members);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }