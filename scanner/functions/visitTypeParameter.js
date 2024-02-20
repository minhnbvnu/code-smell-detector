function visitTypeParameter(type) {
                    visitType(getConstraintOfTypeParameter(type));
                }