function typePredicateKindsMatch(a, b) {
                return a.kind === b.kind && a.parameterIndex === b.parameterIndex;
            }