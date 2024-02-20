function assignNonContextualParameterTypes(signature) {
                if (signature.thisParameter) {
                    assignParameterType(signature.thisParameter);
                }
                for (const parameter of signature.parameters) {
                    assignParameterType(parameter);
                }
            }