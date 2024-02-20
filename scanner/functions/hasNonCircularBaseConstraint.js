function hasNonCircularBaseConstraint(type) {
                return getResolvedBaseConstraint(type) !== circularConstraintType;
            }