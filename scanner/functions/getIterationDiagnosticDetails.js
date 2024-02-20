function getIterationDiagnosticDetails(allowsStrings, downlevelIteration2) {
                    var _a2;
                    if (downlevelIteration2) {
                        return allowsStrings ? [Diagnostics.Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator, true] : [Diagnostics.Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator, true];
                    }
                    const yieldType = getIterationTypeOfIterable(use, 0 /* Yield */, inputType, 
                    /*errorNode*/
                    void 0);
                    if (yieldType) {
                        return [Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher, false];
                    }
                    if (isES2015OrLaterIterable((_a2 = inputType.symbol) == null ? void 0 : _a2.escapedName)) {
                        return [Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher, true];
                    }
                    return allowsStrings ? [Diagnostics.Type_0_is_not_an_array_type_or_a_string_type, true] : [Diagnostics.Type_0_is_not_an_array_type, true];
                }