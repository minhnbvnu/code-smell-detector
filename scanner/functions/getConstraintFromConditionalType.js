function getConstraintFromConditionalType(type) {
                return getConstraintOfDistributiveConditionalType(type) || getDefaultConstraintOfConditionalType(type);
            }