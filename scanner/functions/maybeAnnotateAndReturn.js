function maybeAnnotateAndReturn(expressionToReturn, typeAnnotation) {
            if (typeAnnotation && expressionToReturn) {
                const name = factory.createUniqueName("result", 16 /* Optimistic */);
                return [
                    ...createVariableOrAssignmentOrExpressionStatement(createSynthIdentifier(name), expressionToReturn, typeAnnotation),
                    factory.createReturnStatement(name)
                ];
            }
            return [factory.createReturnStatement(expressionToReturn)];
        }