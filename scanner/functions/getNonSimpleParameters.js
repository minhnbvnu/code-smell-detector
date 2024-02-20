function getNonSimpleParameters(parameters) {
                return filter(parameters, (parameter) => !!parameter.initializer || isBindingPattern(parameter.name) || isRestParameter(parameter));
            }