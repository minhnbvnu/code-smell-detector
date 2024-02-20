function visitTemplateExpression(node) {
                let expression = factory2.createStringLiteral(node.head.text);
                for (const span of node.templateSpans) {
                    const args = [Debug.checkDefined(visitNode(span.expression, visitor, isExpression))];
                    if (span.literal.text.length > 0) {
                        args.push(factory2.createStringLiteral(span.literal.text));
                    }
                    expression = factory2.createCallExpression(factory2.createPropertyAccessExpression(expression, "concat"), 
                    /*typeArguments*/
                    void 0, args);
                }
                return setTextRange(expression, node);
            }