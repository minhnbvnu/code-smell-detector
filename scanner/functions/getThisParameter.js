function getThisParameter(signature) {
            if (signature.parameters.length && !isJSDocSignature(signature)) {
                const thisParameter = signature.parameters[0];
                if (parameterIsThisKeyword(thisParameter)) {
                    return thisParameter;
                }
            }
        }