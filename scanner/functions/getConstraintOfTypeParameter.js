function getConstraintOfTypeParameter(typeParameter) {
                return hasNonCircularBaseConstraint(typeParameter) ? getConstraintFromTypeParameter(typeParameter) : void 0;
            }