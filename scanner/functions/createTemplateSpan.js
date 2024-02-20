function createTemplateSpan(expression, literal) {
                const node = createBaseNode(236 /* TemplateSpan */);
                node.expression = expression;
                node.literal = literal;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.literal) | 1024 /* ContainsES2015 */;
                return node;
            }