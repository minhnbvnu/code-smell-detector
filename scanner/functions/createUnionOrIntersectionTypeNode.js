function createUnionOrIntersectionTypeNode(kind, types, parenthesize) {
                const node = createBaseNode(kind);
                node.types = factory2.createNodeArray(parenthesize(types));
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }