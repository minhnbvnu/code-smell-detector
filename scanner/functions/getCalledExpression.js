function getCalledExpression(scope, range, functionNameText) {
            const functionReference = factory.createIdentifier(functionNameText);
            if (isClassLike(scope)) {
                const lhs = range.facts & 32 /* InStaticRegion */ ? factory.createIdentifier(scope.name.text) : factory.createThis();
                return factory.createPropertyAccessExpression(lhs, functionReference);
            }
            else {
                return functionReference;
            }
        }