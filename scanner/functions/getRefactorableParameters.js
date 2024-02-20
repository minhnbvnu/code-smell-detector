function getRefactorableParameters(parameters) {
            if (hasThisParameter(parameters)) {
                parameters = factory.createNodeArray(parameters.slice(1), parameters.hasTrailingComma);
            }
            return parameters;
        }