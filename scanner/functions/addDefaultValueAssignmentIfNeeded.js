function addDefaultValueAssignmentIfNeeded(parameter, context) {
            return parameter.dotDotDotToken ? parameter : isBindingPattern(parameter.name) ? addDefaultValueAssignmentForBindingPattern(parameter, context) : parameter.initializer ? addDefaultValueAssignmentForInitializer(parameter, parameter.name, parameter.initializer, context) : parameter;
        }