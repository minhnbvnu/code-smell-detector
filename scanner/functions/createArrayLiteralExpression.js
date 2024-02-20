function createArrayLiteralExpression(elements, multiLine) {
                const node = createBaseNode(206 /* ArrayLiteralExpression */);
                const lastElement = elements && lastOrUndefined(elements);
                const elementsArray = createNodeArray(elements, lastElement && isOmittedExpression(lastElement) ? true : void 0);
                node.elements = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
                node.multiLine = multiLine;
                node.transformFlags |= propagateChildrenFlags(node.elements);
                return node;
            }