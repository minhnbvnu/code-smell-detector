function createNamedImports(elements) {
                const node = createBaseNode(272 /* NamedImports */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }