function hasThisParameter(parameters) {
            return parameters.length > 0 && isThis(parameters[0].name);
        }