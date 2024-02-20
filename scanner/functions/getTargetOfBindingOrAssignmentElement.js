function getTargetOfBindingOrAssignmentElement(bindingElement) {
            if (isDeclarationBindingElement(bindingElement)) {
                return bindingElement.name;
            }
            if (isObjectLiteralElementLike(bindingElement)) {
                switch (bindingElement.kind) {
                    case 299 /* PropertyAssignment */:
                        return getTargetOfBindingOrAssignmentElement(bindingElement.initializer);
                    case 300 /* ShorthandPropertyAssignment */:
                        return bindingElement.name;
                    case 301 /* SpreadAssignment */:
                        return getTargetOfBindingOrAssignmentElement(bindingElement.expression);
                }
                return void 0;
            }
            if (isAssignmentExpression(bindingElement, 
            /*excludeCompoundAssignment*/
            true)) {
                return getTargetOfBindingOrAssignmentElement(bindingElement.left);
            }
            if (isSpreadElement(bindingElement)) {
                return getTargetOfBindingOrAssignmentElement(bindingElement.expression);
            }
            return bindingElement;
        }