function convertJsxChildrenToChildrenPropAssignment(children) {
                const nonWhitespaceChildren = getSemanticJsxChildren(children);
                if (length(nonWhitespaceChildren) === 1 && !nonWhitespaceChildren[0].dotDotDotToken) {
                    const result2 = transformJsxChildToExpression(nonWhitespaceChildren[0]);
                    return result2 && factory2.createPropertyAssignment("children", result2);
                }
                const result = mapDefined(children, transformJsxChildToExpression);
                return length(result) ? factory2.createPropertyAssignment("children", factory2.createArrayLiteralExpression(result)) : void 0;
            }