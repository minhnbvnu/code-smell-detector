function getBaseConstraint(t) {
                    const c = getImmediateBaseConstraint(t);
                    return c !== noConstraintType && c !== circularConstraintType ? c : void 0;
                }