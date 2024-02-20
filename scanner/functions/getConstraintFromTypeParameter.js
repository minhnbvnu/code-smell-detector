function getConstraintFromTypeParameter(typeParameter) {
                if (!typeParameter.constraint) {
                    if (typeParameter.target) {
                        const targetConstraint = getConstraintOfTypeParameter(typeParameter.target);
                        typeParameter.constraint = targetConstraint ? instantiateType(targetConstraint, typeParameter.mapper) : noConstraintType;
                    }
                    else {
                        const constraintDeclaration = getConstraintDeclaration(typeParameter);
                        if (!constraintDeclaration) {
                            typeParameter.constraint = getInferredTypeParameterConstraint(typeParameter) || noConstraintType;
                        }
                        else {
                            let type = getTypeFromTypeNode(constraintDeclaration);
                            if (type.flags & 1 /* Any */ && !isErrorType(type)) {
                                type = constraintDeclaration.parent.parent.kind === 197 /* MappedType */ ? keyofConstraintType : unknownType;
                            }
                            typeParameter.constraint = type;
                        }
                    }
                }
                return typeParameter.constraint === noConstraintType ? void 0 : typeParameter.constraint;
            }