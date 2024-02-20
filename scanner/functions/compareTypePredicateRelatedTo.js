function compareTypePredicateRelatedTo(source, target, reportErrors2, errorReporter, compareTypes) {
                if (source.kind !== target.kind) {
                    if (reportErrors2) {
                        errorReporter(Diagnostics.A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard);
                        errorReporter(Diagnostics.Type_predicate_0_is_not_assignable_to_1, typePredicateToString(source), typePredicateToString(target));
                    }
                    return 0 /* False */;
                }
                if (source.kind === 1 /* Identifier */ || source.kind === 3 /* AssertsIdentifier */) {
                    if (source.parameterIndex !== target.parameterIndex) {
                        if (reportErrors2) {
                            errorReporter(Diagnostics.Parameter_0_is_not_in_the_same_position_as_parameter_1, source.parameterName, target.parameterName);
                            errorReporter(Diagnostics.Type_predicate_0_is_not_assignable_to_1, typePredicateToString(source), typePredicateToString(target));
                        }
                        return 0 /* False */;
                    }
                }
                const related = source.type === target.type ? -1 /* True */ : source.type && target.type ? compareTypes(source.type, target.type, reportErrors2) : 0 /* False */;
                if (related === 0 /* False */ && reportErrors2) {
                    errorReporter(Diagnostics.Type_predicate_0_is_not_assignable_to_1, typePredicateToString(source), typePredicateToString(target));
                }
                return related;
            }