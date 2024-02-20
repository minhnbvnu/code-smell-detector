function createNamedExports(elements) {
                const node = createBaseNode(276 /* NamedExports */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }