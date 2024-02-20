function visitElements(elements, leadingElement, location, multiLine) {
                const numInitialElements = countInitialNodesWithoutYield(elements);
                let temp;
                if (numInitialElements > 0) {
                    temp = declareLocal();
                    const initialElements = visitNodes2(elements, visitor, isExpression, 0, numInitialElements);
                    emitAssignment(temp, factory2.createArrayLiteralExpression(leadingElement ? [leadingElement, ...initialElements] : initialElements));
                    leadingElement = void 0;
                }
                const expressions = reduceLeft(elements, reduceElement, [], numInitialElements);
                return temp ? factory2.createArrayConcatCall(temp, [factory2.createArrayLiteralExpression(expressions, multiLine)]) : setTextRange(factory2.createArrayLiteralExpression(leadingElement ? [leadingElement, ...expressions] : expressions, multiLine), location);
                function reduceElement(expressions2, element) {
                    if (containsYield(element) && expressions2.length > 0) {
                        const hasAssignedTemp = temp !== void 0;
                        if (!temp) {
                            temp = declareLocal();
                        }
                        emitAssignment(temp, hasAssignedTemp ? factory2.createArrayConcatCall(temp, [factory2.createArrayLiteralExpression(expressions2, multiLine)]) : factory2.createArrayLiteralExpression(leadingElement ? [leadingElement, ...expressions2] : expressions2, multiLine));
                        leadingElement = void 0;
                        expressions2 = [];
                    }
                    expressions2.push(Debug.checkDefined(visitNode(element, visitor, isExpression)));
                    return expressions2;
                }
            }