function createFunctionApplyCall(target, thisArg, argumentsExpression) {
                return createMethodCall(target, "apply", [thisArg, argumentsExpression]);
            }