function createBindingElementFromParameterDeclaration(parameterDeclaration) {
                const element = factory.createBindingElement(
                /*dotDotDotToken*/
                void 0, 
                /*propertyName*/
                void 0, getParameterName(parameterDeclaration), isRestParameter(parameterDeclaration) && isOptionalParameter(parameterDeclaration) ? factory.createArrayLiteralExpression() : parameterDeclaration.initializer);
                suppressLeadingAndTrailingTrivia(element);
                if (parameterDeclaration.initializer && element.initializer) {
                    copyComments(parameterDeclaration.initializer, element.initializer);
                }
                return element;
            }