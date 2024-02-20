function areAllOuterTypeParametersApplied(type) {
                const outerTypeParameters = type.outerTypeParameters;
                if (outerTypeParameters) {
                    const last2 = outerTypeParameters.length - 1;
                    const typeArguments = getTypeArguments(type);
                    return outerTypeParameters[last2].symbol !== typeArguments[last2].symbol;
                }
                return true;
            }