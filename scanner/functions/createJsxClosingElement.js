function createJsxClosingElement(tagName) {
                const node = createBaseNode(284 /* JsxClosingElement */);
                node.tagName = tagName;
                node.transformFlags |= propagateChildFlags(node.tagName) | 2 /* ContainsJsx */;
                return node;
            }