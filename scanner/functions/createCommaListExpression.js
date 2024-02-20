function createCommaListExpression(elements) {
                const node = createBaseNode(357 /* CommaListExpression */);
                node.elements = createNodeArray(sameFlatMap(elements, flattenCommaElements));
                node.transformFlags |= propagateChildrenFlags(node.elements);
                return node;
            }