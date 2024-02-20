function getSetAccessorValueParameter(accessor) {
            if (accessor && accessor.parameters.length > 0) {
                const hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
                return accessor.parameters[hasThis ? 1 : 0];
            }
        }