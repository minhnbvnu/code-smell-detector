function addDefaultValueAssignmentsIfNeeded(parameters, context) {
            let result;
            for (let i = 0; i < parameters.length; i++) {
                const parameter = parameters[i];
                const updated = addDefaultValueAssignmentIfNeeded(parameter, context);
                if (result || updated !== parameter) {
                    if (!result)
                        result = parameters.slice(0, i);
                    result[i] = updated;
                }
            }
            if (result) {
                return setTextRange(context.factory.createNodeArray(result, parameters.hasTrailingComma), parameters);
            }
            return parameters;
        }