function checkTypeArgumentConstraints(node, typeParameters) {
                let typeArguments;
                let mapper;
                let result = true;
                for (let i = 0; i < typeParameters.length; i++) {
                    const constraint = getConstraintOfTypeParameter(typeParameters[i]);
                    if (constraint) {
                        if (!typeArguments) {
                            typeArguments = getEffectiveTypeArguments2(node, typeParameters);
                            mapper = createTypeMapper(typeParameters, typeArguments);
                        }
                        result = result && checkTypeAssignableTo(typeArguments[i], instantiateType(constraint, mapper), node.typeArguments[i], Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
                return result;
            }