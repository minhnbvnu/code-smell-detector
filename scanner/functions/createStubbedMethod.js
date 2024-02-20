function createStubbedMethod(modifiers, name, optional, typeParameters, parameters, returnType, quotePreference, body) {
            return factory.createMethodDeclaration(modifiers, 
            /*asteriskToken*/
            void 0, name, optional ? factory.createToken(57 /* QuestionToken */) : void 0, typeParameters, parameters, returnType, body || createStubbedMethodBody(quotePreference));
        }