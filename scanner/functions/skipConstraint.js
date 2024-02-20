function skipConstraint(type) {
            return type.isTypeParameter() ? type.getConstraint() || type : type;
        }