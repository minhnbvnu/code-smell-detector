function getConstraintOfIndexedAccess(type) {
                return hasNonCircularBaseConstraint(type) ? getConstraintFromIndexedAccess(type) : void 0;
            }