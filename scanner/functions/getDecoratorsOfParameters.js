function getDecoratorsOfParameters(node) {
            let decorators;
            if (node) {
                const parameters = node.parameters;
                const firstParameterIsThis = parameters.length > 0 && parameterIsThisKeyword(parameters[0]);
                const firstParameterOffset = firstParameterIsThis ? 1 : 0;
                const numParameters = firstParameterIsThis ? parameters.length - 1 : parameters.length;
                for (let i = 0; i < numParameters; i++) {
                    const parameter = parameters[i + firstParameterOffset];
                    if (decorators || hasDecorators(parameter)) {
                        if (!decorators) {
                            decorators = new Array(numParameters);
                        }
                        decorators[i] = getDecorators(parameter);
                    }
                }
            }
            return decorators;
        }