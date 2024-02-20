function getSimplifiedTypeOrConstraint(type) {
                const simplified = getSimplifiedType(type, 
                /*writing*/
                false);
                return simplified !== type ? simplified : getConstraintOfType(type);
            }