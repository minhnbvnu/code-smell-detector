function getModifiersTypeFromMappedType(type) {
                if (!type.modifiersType) {
                    if (isMappedTypeWithKeyofConstraintDeclaration(type)) {
                        type.modifiersType = instantiateType(getTypeFromTypeNode(getConstraintDeclarationForMappedType(type).type), type.mapper);
                    }
                    else {
                        const declaredType = getTypeFromMappedTypeNode(type.declaration);
                        const constraint = getConstraintTypeFromMappedType(declaredType);
                        const extendedConstraint = constraint && constraint.flags & 262144 /* TypeParameter */ ? getConstraintOfTypeParameter(constraint) : constraint;
                        type.modifiersType = extendedConstraint && extendedConstraint.flags & 4194304 /* Index */ ? instantiateType(extendedConstraint.type, type.mapper) : unknownType;
                    }
                }
                return type.modifiersType;
            }