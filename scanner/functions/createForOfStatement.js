function createForOfStatement(awaitModifier, initializer, expression, statement) {
                const node = createBaseNode(247 /* ForOfStatement */);
                node.awaitModifier = awaitModifier;
                node.initializer = initializer;
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.awaitModifier) | propagateChildFlags(node.initializer) | propagateChildFlags(node.expression) | propagateChildFlags(node.statement) | 1024 /* ContainsES2015 */;
                if (awaitModifier)
                    node.transformFlags |= 128 /* ContainsES2018 */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                return node;
            }