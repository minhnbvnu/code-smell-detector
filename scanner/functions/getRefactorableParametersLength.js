function getRefactorableParametersLength(parameters) {
            if (hasThisParameter(parameters)) {
                return parameters.length - 1;
            }
            return parameters.length;
        }