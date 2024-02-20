function getInitializerOfBindingOrAssignmentElement(bindingElement) {
            if (isDeclarationBindingElement(bindingElement)) {
                return bindingElement.initializer;
            }
            if (isPropertyAssignment(bindingElement)) {
                const initializer = bindingElement.initializer;
                return isAssignmentExpression(initializer, 
                /*excludeCompoundAssignment*/
                true) ? initializer.right : void 0;
            }
            if (isShorthandPropertyAssignment(bindingElement)) {
                return bindingElement.objectAssignmentInitializer;
            }
            if (isAssignmentExpression(bindingElement, 
            /*excludeCompoundAssignment*/
            true)) {
                return bindingElement.right;
            }
            if (isSpreadElement(bindingElement)) {
                return getInitializerOfBindingOrAssignmentElement(bindingElement.expression);
            }
        }