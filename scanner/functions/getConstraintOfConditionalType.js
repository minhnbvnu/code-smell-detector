function getConstraintOfConditionalType(type) {
                return hasNonCircularBaseConstraint(type) ? getConstraintFromConditionalType(type) : void 0;
            }