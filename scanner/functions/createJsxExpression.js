function createJsxExpression(dotDotDotToken, expression) {
                const node = createBaseNode(291 /* JsxExpression */);
                node.dotDotDotToken = dotDotDotToken;
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.dotDotDotToken) | propagateChildFlags(node.expression) | 2 /* ContainsJsx */;
                return node;
            }