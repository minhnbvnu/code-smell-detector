function createFunctionBindCall(target, thisArg, argumentsList) {
                return createMethodCall(target, "bind", [thisArg, ...argumentsList]);
            }