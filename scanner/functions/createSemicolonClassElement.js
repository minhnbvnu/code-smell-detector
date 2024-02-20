function createSemicolonClassElement() {
                const node = createBaseNode(237 /* SemicolonClassElement */);
                node.transformFlags |= 1024 /* ContainsES2015 */;
                return node;
            }