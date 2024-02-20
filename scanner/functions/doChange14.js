function doChange14(changes, sourceFile, arg, expression) {
            const callExpression = factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("Number"), factory.createIdentifier("isNaN")), 
            /*typeArguments*/
            void 0, [arg]);
            const operator = expression.operatorToken.kind;
            changes.replaceNode(sourceFile, expression, operator === 37 /* ExclamationEqualsEqualsToken */ || operator === 35 /* ExclamationEqualsToken */ ? factory.createPrefixUnaryExpression(53 /* ExclamationToken */, callExpression) : callExpression);
        }