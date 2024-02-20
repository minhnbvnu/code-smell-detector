function getDefaultConstraintOfConditionalType(type) {
                if (!type.resolvedDefaultConstraint) {
                    const trueConstraint = getInferredTrueTypeFromConditionalType(type);
                    const falseConstraint = getFalseTypeFromConditionalType(type);
                    type.resolvedDefaultConstraint = isTypeAny(trueConstraint) ? falseConstraint : isTypeAny(falseConstraint) ? trueConstraint : getUnionType([trueConstraint, falseConstraint]);
                }
                return type.resolvedDefaultConstraint;
            }