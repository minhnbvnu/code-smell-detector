function getResolvedTypeParameterDefault(typeParameter) {
                if (!typeParameter.default) {
                    if (typeParameter.target) {
                        const targetDefault = getResolvedTypeParameterDefault(typeParameter.target);
                        typeParameter.default = targetDefault ? instantiateType(targetDefault, typeParameter.mapper) : noConstraintType;
                    }
                    else {
                        typeParameter.default = resolvingDefaultType;
                        const defaultDeclaration = typeParameter.symbol && forEach(typeParameter.symbol.declarations, (decl) => isTypeParameterDeclaration(decl) && decl.default);
                        const defaultType = defaultDeclaration ? getTypeFromTypeNode(defaultDeclaration) : noConstraintType;
                        if (typeParameter.default === resolvingDefaultType) {
                            typeParameter.default = defaultType;
                        }
                    }
                }
                else if (typeParameter.default === resolvingDefaultType) {
                    typeParameter.default = circularConstraintType;
                }
                return typeParameter.default;
            }