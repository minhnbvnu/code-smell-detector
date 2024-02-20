function createNewParameters(functionDeclaration, program, host) {
            const checker = program.getTypeChecker();
            const refactorableParameters = getRefactorableParameters(functionDeclaration.parameters);
            const bindingElements = map(refactorableParameters, createBindingElementFromParameterDeclaration);
            const objectParameterName = factory.createObjectBindingPattern(bindingElements);
            const objectParameterType = createParameterTypeNode(refactorableParameters);
            let objectInitializer;
            if (every(refactorableParameters, isOptionalParameter)) {
                objectInitializer = factory.createObjectLiteralExpression();
            }
            const objectParameter = factory.createParameterDeclaration(
            /*modifiers*/
            void 0, 
            /*dotDotDotToken*/
            void 0, objectParameterName, 
            /*questionToken*/
            void 0, objectParameterType, objectInitializer);
            if (hasThisParameter(functionDeclaration.parameters)) {
                const thisParameter = functionDeclaration.parameters[0];
                const newThisParameter = factory.createParameterDeclaration(
                /*modifiers*/
                void 0, 
                /*dotDotDotToken*/
                void 0, thisParameter.name, 
                /*questionToken*/
                void 0, thisParameter.type);
                suppressLeadingAndTrailingTrivia(newThisParameter.name);
                copyComments(thisParameter.name, newThisParameter.name);
                if (thisParameter.type) {
                    suppressLeadingAndTrailingTrivia(newThisParameter.type);
                    copyComments(thisParameter.type, newThisParameter.type);
                }
                return factory.createNodeArray([newThisParameter, objectParameter]);
            }
            return factory.createNodeArray([objectParameter]);
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
            function createParameterTypeNode(parameters) {
                const members = map(parameters, createPropertySignatureFromParameterDeclaration);
                const typeNode = addEmitFlags(factory.createTypeLiteralNode(members), 1 /* SingleLine */);
                return typeNode;
            }
            function createPropertySignatureFromParameterDeclaration(parameterDeclaration) {
                let parameterType = parameterDeclaration.type;
                if (!parameterType && (parameterDeclaration.initializer || isRestParameter(parameterDeclaration))) {
                    parameterType = getTypeNode3(parameterDeclaration);
                }
                const propertySignature = factory.createPropertySignature(
                /*modifiers*/
                void 0, getParameterName(parameterDeclaration), isOptionalParameter(parameterDeclaration) ? factory.createToken(57 /* QuestionToken */) : parameterDeclaration.questionToken, parameterType);
                suppressLeadingAndTrailingTrivia(propertySignature);
                copyComments(parameterDeclaration.name, propertySignature.name);
                if (parameterDeclaration.type && propertySignature.type) {
                    copyComments(parameterDeclaration.type, propertySignature.type);
                }
                return propertySignature;
            }
            function getTypeNode3(node) {
                const type = checker.getTypeAtLocation(node);
                return getTypeNodeIfAccessible(type, node, program, host);
            }
            function isOptionalParameter(parameterDeclaration) {
                if (isRestParameter(parameterDeclaration)) {
                    const type = checker.getTypeAtLocation(parameterDeclaration);
                    return !checker.isTupleType(type);
                }
                return checker.isOptionalParameter(parameterDeclaration);
            }
        }