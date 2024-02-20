function getDiagnosticSpanForCallNode(node, doNotIncludeArguments) {
                let start;
                let length2;
                const sourceFile = getSourceFileOfNode(node);
                if (isPropertyAccessExpression(node.expression)) {
                    const nameSpan = getErrorSpanForNode(sourceFile, node.expression.name);
                    start = nameSpan.start;
                    length2 = doNotIncludeArguments ? nameSpan.length : node.end - start;
                }
                else {
                    const expressionSpan = getErrorSpanForNode(sourceFile, node.expression);
                    start = expressionSpan.start;
                    length2 = doNotIncludeArguments ? expressionSpan.length : node.end - start;
                }
                return { start, length: length2, sourceFile };
            }