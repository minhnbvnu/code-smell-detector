function cloneTypeParameter(typeParameter) {
                const result = createTypeParameter(typeParameter.symbol);
                result.target = typeParameter;
                return result;
            }