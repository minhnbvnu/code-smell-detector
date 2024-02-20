function createJsxSpreadAttribute(expression) {
                const node = createBaseNode(290 /* JsxSpreadAttribute */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression) | 2 /* ContainsJsx */;
                return node;
            }