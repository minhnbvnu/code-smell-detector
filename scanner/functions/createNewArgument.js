function createNewArgument(functionDeclaration, functionArguments) {
            const parameters = getRefactorableParameters(functionDeclaration.parameters);
            const hasRestParameter2 = isRestParameter(last(parameters));
            const nonRestArguments = hasRestParameter2 ? functionArguments.slice(0, parameters.length - 1) : functionArguments;
            const properties = map(nonRestArguments, (arg, i) => {
                const parameterName = getParameterName(parameters[i]);
                const property = createPropertyOrShorthandAssignment(parameterName, arg);
                suppressLeadingAndTrailingTrivia(property.name);
                if (isPropertyAssignment(property))
                    suppressLeadingAndTrailingTrivia(property.initializer);
                copyComments(arg, property);
                return property;
            });
            if (hasRestParameter2 && functionArguments.length >= parameters.length) {
                const restArguments = functionArguments.slice(parameters.length - 1);
                const restProperty = factory.createPropertyAssignment(getParameterName(last(parameters)), factory.createArrayLiteralExpression(restArguments));
                properties.push(restProperty);
            }
            const objectLiteral = factory.createObjectLiteralExpression(properties, 
            /*multiLine*/
            false);
            return objectLiteral;
        }