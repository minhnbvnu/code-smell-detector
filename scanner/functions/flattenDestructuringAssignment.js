function flattenDestructuringAssignment(node, visitor, context, level, needsValue, createAssignmentCallback) {
            let location = node;
            let value;
            if (isDestructuringAssignment(node)) {
                value = node.right;
                while (isEmptyArrayLiteral(node.left) || isEmptyObjectLiteral(node.left)) {
                    if (isDestructuringAssignment(value)) {
                        location = node = value;
                        value = node.right;
                    }
                    else {
                        return Debug.checkDefined(visitNode(value, visitor, isExpression));
                    }
                }
            }
            let expressions;
            const flattenContext = {
                context,
                level,
                downlevelIteration: !!context.getCompilerOptions().downlevelIteration,
                hoistTempVariables: true,
                emitExpression,
                emitBindingOrAssignment,
                createArrayBindingOrAssignmentPattern: (elements) => makeArrayAssignmentPattern(context.factory, elements),
                createObjectBindingOrAssignmentPattern: (elements) => makeObjectAssignmentPattern(context.factory, elements),
                createArrayBindingOrAssignmentElement: makeAssignmentElement,
                visitor
            };
            if (value) {
                value = visitNode(value, visitor, isExpression);
                Debug.assert(value);
                if (isIdentifier(value) && bindingOrAssignmentElementAssignsToName(node, value.escapedText) || bindingOrAssignmentElementContainsNonLiteralComputedName(node)) {
                    value = ensureIdentifier(flattenContext, value, 
                    /*reuseIdentifierExpressions*/
                    false, location);
                }
                else if (needsValue) {
                    value = ensureIdentifier(flattenContext, value, 
                    /*reuseIdentifierExpressions*/
                    true, location);
                }
                else if (nodeIsSynthesized(node)) {
                    location = value;
                }
            }
            flattenBindingOrAssignmentElement(flattenContext, node, value, location, 
            /*skipInitializer*/
            isDestructuringAssignment(node));
            if (value && needsValue) {
                if (!some(expressions)) {
                    return value;
                }
                expressions.push(value);
            }
            return context.factory.inlineExpressions(expressions) || context.factory.createOmittedExpression();
            function emitExpression(expression) {
                expressions = append(expressions, expression);
            }
            function emitBindingOrAssignment(target, value2, location2, original) {
                Debug.assertNode(target, createAssignmentCallback ? isIdentifier : isExpression);
                const expression = createAssignmentCallback ? createAssignmentCallback(target, value2, location2) : setTextRange(context.factory.createAssignment(Debug.checkDefined(visitNode(target, visitor, isExpression)), value2), location2);
                expression.original = original;
                emitExpression(expression);
            }
        }