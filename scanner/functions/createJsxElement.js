function createJsxElement(openingElement, children, closingElement) {
                const node = createBaseNode(281 /* JsxElement */);
                node.openingElement = openingElement;
                node.children = createNodeArray(children);
                node.closingElement = closingElement;
                node.transformFlags |= propagateChildFlags(node.openingElement) | propagateChildrenFlags(node.children) | propagateChildFlags(node.closingElement) | 2 /* ContainsJsx */;
                return node;
            }