function maybe_assign(no_in) {
                var left = maybe_conditional(no_in), val = S.token.value;
                if (is("operator") && HOP(ASSIGNMENT, val)) {
                        if (is_assignable(left)) {
                                next();
                                return as("assign", ASSIGNMENT[val], left, maybe_assign(no_in));
                        }
                        croak("Invalid assignment");
                }
                return left;
        }