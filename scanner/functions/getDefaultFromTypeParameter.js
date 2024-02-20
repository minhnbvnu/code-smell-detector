function getDefaultFromTypeParameter(typeParameter) {
                const defaultType = getResolvedTypeParameterDefault(typeParameter);
                return defaultType !== noConstraintType && defaultType !== circularConstraintType ? defaultType : void 0;
            }