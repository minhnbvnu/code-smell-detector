function createNodeConverters(factory2) {
            return {
                convertToFunctionBlock,
                convertToFunctionExpression,
                convertToArrayAssignmentElement,
                convertToObjectAssignmentElement,
                convertToAssignmentPattern,
                convertToObjectAssignmentPattern,
                convertToArrayAssignmentPattern,
                convertToAssignmentElementTarget
            };
            function convertToFunctionBlock(node, multiLine) {
                if (isBlock(node))
                    return node;
                const returnStatement = factory2.createReturnStatement(node);
                setTextRange(returnStatement, node);
                const body = factory2.createBlock([returnStatement], multiLine);
                setTextRange(body, node);
                return body;
            }
            function convertToFunctionExpression(node) {
                if (!node.body)
                    return Debug.fail(`Cannot convert a FunctionDeclaration without a body`);
                const updated = factory2.createFunctionExpression(getModifiers(node), node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body);
                setOriginalNode(updated, node);
                setTextRange(updated, node);
                if (getStartsOnNewLine(node)) {
                    setStartsOnNewLine(updated, 
                    /*newLine*/
                    true);
                }
                return updated;
            }
            function convertToArrayAssignmentElement(element) {
                if (isBindingElement(element)) {
                    if (element.dotDotDotToken) {
                        Debug.assertNode(element.name, isIdentifier);
                        return setOriginalNode(setTextRange(factory2.createSpreadElement(element.name), element), element);
                    }
                    const expression = convertToAssignmentElementTarget(element.name);
                    return element.initializer ? setOriginalNode(setTextRange(factory2.createAssignment(expression, element.initializer), element), element) : expression;
                }
                return cast(element, isExpression);
            }
            function convertToObjectAssignmentElement(element) {
                if (isBindingElement(element)) {
                    if (element.dotDotDotToken) {
                        Debug.assertNode(element.name, isIdentifier);
                        return setOriginalNode(setTextRange(factory2.createSpreadAssignment(element.name), element), element);
                    }
                    if (element.propertyName) {
                        const expression = convertToAssignmentElementTarget(element.name);
                        return setOriginalNode(setTextRange(factory2.createPropertyAssignment(element.propertyName, element.initializer ? factory2.createAssignment(expression, element.initializer) : expression), element), element);
                    }
                    Debug.assertNode(element.name, isIdentifier);
                    return setOriginalNode(setTextRange(factory2.createShorthandPropertyAssignment(element.name, element.initializer), element), element);
                }
                return cast(element, isObjectLiteralElementLike);
            }
            function convertToAssignmentPattern(node) {
                switch (node.kind) {
                    case 204 /* ArrayBindingPattern */:
                    case 206 /* ArrayLiteralExpression */:
                        return convertToArrayAssignmentPattern(node);
                    case 203 /* ObjectBindingPattern */:
                    case 207 /* ObjectLiteralExpression */:
                        return convertToObjectAssignmentPattern(node);
                }
            }
            function convertToObjectAssignmentPattern(node) {
                if (isObjectBindingPattern(node)) {
                    return setOriginalNode(setTextRange(factory2.createObjectLiteralExpression(map(node.elements, convertToObjectAssignmentElement)), node), node);
                }
                return cast(node, isObjectLiteralExpression);
            }
            function convertToArrayAssignmentPattern(node) {
                if (isArrayBindingPattern(node)) {
                    return setOriginalNode(setTextRange(factory2.createArrayLiteralExpression(map(node.elements, convertToArrayAssignmentElement)), node), node);
                }
                return cast(node, isArrayLiteralExpression);
            }
            function convertToAssignmentElementTarget(node) {
                if (isBindingPattern(node)) {
                    return convertToAssignmentPattern(node);
                }
                return cast(node, isExpression);
            }
        }