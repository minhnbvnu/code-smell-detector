function reportOperatorErrorUnless(typesAreCompatible) {
                    if (!typesAreCompatible(leftType, rightType)) {
                        reportOperatorError(typesAreCompatible);
                        return true;
                    }
                    return false;
                }