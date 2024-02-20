function createFunctionCallCall(target, thisArg, argumentsList) {
                return createMethodCall(target, "call", [thisArg, ...argumentsList]);
            }