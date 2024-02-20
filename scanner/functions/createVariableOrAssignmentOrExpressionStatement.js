function createVariableOrAssignmentOrExpressionStatement(variableName, rightHandSide, typeAnnotation) {
            if (!variableName || isEmptyBindingName(variableName)) {
                return [factory.createExpressionStatement(rightHandSide)];
            }
            if (isSynthIdentifier(variableName) && variableName.hasBeenDeclared) {
                return [factory.createExpressionStatement(factory.createAssignment(getSynthesizedDeepClone(referenceSynthIdentifier(variableName)), rightHandSide))];
            }
            return [
                factory.createVariableStatement(
                /*modifiers*/
                void 0, factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(getSynthesizedDeepClone(declareSynthBindingName(variableName)), 
                    /*exclamationToken*/
                    void 0, typeAnnotation, rightHandSide)
                ], 2 /* Const */))
            ];
        }