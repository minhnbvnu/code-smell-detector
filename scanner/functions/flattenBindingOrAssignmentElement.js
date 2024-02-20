function flattenBindingOrAssignmentElement(flattenContext, element, value, location, skipInitializer) {
            const bindingTarget = getTargetOfBindingOrAssignmentElement(element);
            if (!skipInitializer) {
                const initializer = visitNode(getInitializerOfBindingOrAssignmentElement(element), flattenContext.visitor, isExpression);
                if (initializer) {
                    if (value) {
                        value = createDefaultValueCheck(flattenContext, value, initializer, location);
                        if (!isSimpleInlineableExpression(initializer) && isBindingOrAssignmentPattern(bindingTarget)) {
                            value = ensureIdentifier(flattenContext, value, 
                            /*reuseIdentifierExpressions*/
                            true, location);
                        }
                    }
                    else {
                        value = initializer;
                    }
                }
                else if (!value) {
                    value = flattenContext.context.factory.createVoidZero();
                }
            }
            if (isObjectBindingOrAssignmentPattern(bindingTarget)) {
                flattenObjectBindingOrAssignmentPattern(flattenContext, element, bindingTarget, value, location);
            }
            else if (isArrayBindingOrAssignmentPattern(bindingTarget)) {
                flattenArrayBindingOrAssignmentPattern(flattenContext, element, bindingTarget, value, location);
            }
            else {
                flattenContext.emitBindingOrAssignment(bindingTarget, value, location, 
                /*original*/
                element);
            }
        }