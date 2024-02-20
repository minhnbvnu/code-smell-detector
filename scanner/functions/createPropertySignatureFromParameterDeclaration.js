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