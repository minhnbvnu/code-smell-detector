function createHeritageClause(token, types) {
                const node = createBaseNode(294 /* HeritageClause */);
                node.token = token;
                node.types = createNodeArray(types);
                node.transformFlags |= propagateChildrenFlags(node.types);
                switch (token) {
                    case 94 /* ExtendsKeyword */:
                        node.transformFlags |= 1024 /* ContainsES2015 */;
                        break;
                    case 117 /* ImplementsKeyword */:
                        node.transformFlags |= 1 /* ContainsTypeScript */;
                        break;
                    default:
                        return Debug.assertNever(token);
                }
                return node;
            }