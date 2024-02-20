function typeParameterToDeclaration(type, context, constraint = getConstraintOfTypeParameter(type)) {
                    const constraintNode = constraint && typeToTypeNodeHelper(constraint, context);
                    return typeParameterToDeclarationWithConstraint(type, context, constraintNode);
                }