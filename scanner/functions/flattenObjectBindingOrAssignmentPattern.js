function flattenObjectBindingOrAssignmentPattern(flattenContext, parent2, pattern, value, location) {
            const elements = getElementsOfBindingOrAssignmentPattern(pattern);
            const numElements = elements.length;
            if (numElements !== 1) {
                const reuseIdentifierExpressions = !isDeclarationBindingElement(parent2) || numElements !== 0;
                value = ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location);
            }
            let bindingElements;
            let computedTempVariables;
            for (let i = 0; i < numElements; i++) {
                const element = elements[i];
                if (!getRestIndicatorOfBindingOrAssignmentElement(element)) {
                    const propertyName = getPropertyNameOfBindingOrAssignmentElement(element);
                    if (flattenContext.level >= 1 /* ObjectRest */ && !(element.transformFlags & (32768 /* ContainsRestOrSpread */ | 65536 /* ContainsObjectRestOrSpread */)) && !(getTargetOfBindingOrAssignmentElement(element).transformFlags & (32768 /* ContainsRestOrSpread */ | 65536 /* ContainsObjectRestOrSpread */)) && !isComputedPropertyName(propertyName)) {
                        bindingElements = append(bindingElements, visitNode(element, flattenContext.visitor, isBindingOrAssignmentElement));
                    }
                    else {
                        if (bindingElements) {
                            flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
                            bindingElements = void 0;
                        }
                        const rhsValue = createDestructuringPropertyAccess(flattenContext, value, propertyName);
                        if (isComputedPropertyName(propertyName)) {
                            computedTempVariables = append(computedTempVariables, rhsValue.argumentExpression);
                        }
                        flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, 
                        /*location*/
                        element);
                    }
                }
                else if (i === numElements - 1) {
                    if (bindingElements) {
                        flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
                        bindingElements = void 0;
                    }
                    const rhsValue = flattenContext.context.getEmitHelperFactory().createRestHelper(value, elements, computedTempVariables, pattern);
                    flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, element);
                }
            }
            if (bindingElements) {
                flattenContext.emitBindingOrAssignment(flattenContext.createObjectBindingOrAssignmentPattern(bindingElements), value, location, pattern);
            }
        }