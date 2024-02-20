function createMetaProperty(keywordToken, name) {
                const node = createBaseNode(233 /* MetaProperty */);
                node.keywordToken = keywordToken;
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.name);
                switch (keywordToken) {
                    case 103 /* NewKeyword */:
                        node.transformFlags |= 1024 /* ContainsES2015 */;
                        break;
                    case 100 /* ImportKeyword */:
                        node.transformFlags |= 4 /* ContainsESNext */;
                        break;
                    default:
                        return Debug.assertNever(keywordToken);
                }
                node.flowNode = void 0;
                return node;
            }