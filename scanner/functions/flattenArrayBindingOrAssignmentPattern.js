function flattenArrayBindingOrAssignmentPattern(flattenContext, parent2, pattern, value, location) {
            const elements = getElementsOfBindingOrAssignmentPattern(pattern);
            const numElements = elements.length;
            if (flattenContext.level < 1 /* ObjectRest */ && flattenContext.downlevelIteration) {
                value = ensureIdentifier(flattenContext, setTextRange(flattenContext.context.getEmitHelperFactory().createReadHelper(value, numElements > 0 && getRestIndicatorOfBindingOrAssignmentElement(elements[numElements - 1]) ? void 0 : numElements), location), 
                /*reuseIdentifierExpressions*/
                false, location);
            }
            else if (numElements !== 1 && (flattenContext.level < 1 /* ObjectRest */ || numElements === 0) || every(elements, isOmittedExpression)) {
                const reuseIdentifierExpressions = !isDeclarationBindingElement(parent2) || numElements !== 0;
                value = ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location);
            }
            let bindingElements;
            let restContainingElements;
            for (let i = 0; i < numElements; i++) {
                const element = elements[i];
                if (flattenContext.level >= 1 /* ObjectRest */) {
                    if (element.transformFlags & 65536 /* ContainsObjectRestOrSpread */ || flattenContext.hasTransformedPriorElement && !isSimpleBindingOrAssignmentElement(element)) {
                        flattenContext.hasTransformedPriorElement = true;
                        const temp = flattenContext.context.factory.createTempVariable(
                        /*recordTempVariable*/
                        void 0);
                        if (flattenContext.hoistTempVariables) {
                            flattenContext.context.hoistVariableDeclaration(temp);
                        }
                        restContainingElements = append(restContainingElements, [temp, element]);
                        bindingElements = append(bindingElements, flattenContext.createArrayBindingOrAssignmentElement(temp));
                    }
                    else {
                        bindingElements = append(bindingElements, element);
                    }
                }
                else if (isOmittedExpression(element)) {
                    continue;
                }
                else if (!getRestIndicatorOfBindingOrAssignmentElement(element)) {
                    const rhsValue = flattenContext.context.factory.createElementAccessExpression(value, i);
                    flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, 
                    /*location*/
                    element);
                }
                else if (i === numElements - 1) {
                    const rhsValue = flattenContext.context.factory.createArraySliceCall(value, i);
                    flattenBindingOrAssignmentElement(flattenContext, element, rhsValue, 
                    /*location*/
                    element);
                }
            }
            if (bindingElements) {
                flattenContext.emitBindingOrAssignment(flattenContext.createArrayBindingOrAssignmentPattern(bindingElements), value, location, pattern);
            }
            if (restContainingElements) {
                for (const [id, element] of restContainingElements) {
                    flattenBindingOrAssignmentElement(flattenContext, element, id, element);
                }
            }
        }