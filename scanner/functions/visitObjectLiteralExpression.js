function visitObjectLiteralExpression(node) {
                const properties = node.properties;
                const multiLine = node.multiLine;
                const numInitialProperties = countInitialNodesWithoutYield(properties);
                const temp = declareLocal();
                emitAssignment(temp, factory2.createObjectLiteralExpression(visitNodes2(properties, visitor, isObjectLiteralElementLike, 0, numInitialProperties), multiLine));
                const expressions = reduceLeft(properties, reduceProperty, [], numInitialProperties);
                expressions.push(multiLine ? startOnNewLine(setParent(setTextRange(factory2.cloneNode(temp), temp), temp.parent)) : temp);
                return factory2.inlineExpressions(expressions);
                function reduceProperty(expressions2, property) {
                    if (containsYield(property) && expressions2.length > 0) {
                        emitStatement(factory2.createExpressionStatement(factory2.inlineExpressions(expressions2)));
                        expressions2 = [];
                    }
                    const expression = createExpressionForObjectLiteralElementLike(factory2, node, property, temp);
                    const visited = visitNode(expression, visitor, isExpression);
                    if (visited) {
                        if (multiLine) {
                            startOnNewLine(visited);
                        }
                        expressions2.push(visited);
                    }
                    return expressions2;
                }
            }