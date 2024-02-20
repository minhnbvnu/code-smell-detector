function createJsxFragment(openingFragment, children, closingFragment) {
                const node = createBaseNode(285 /* JsxFragment */);
                node.openingFragment = openingFragment;
                node.children = createNodeArray(children);
                node.closingFragment = closingFragment;
                node.transformFlags |= propagateChildFlags(node.openingFragment) | propagateChildrenFlags(node.children) | propagateChildFlags(node.closingFragment) | 2 /* ContainsJsx */;
                return node;
            }