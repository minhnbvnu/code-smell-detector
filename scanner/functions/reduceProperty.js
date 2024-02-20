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