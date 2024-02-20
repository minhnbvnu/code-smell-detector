function createRestTypeNode(type) {
                const node = createBaseNode(188 /* RestType */);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }