function mapSuggestionDiagnostic(errorCode) {
            switch (errorCode) {
                case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code;
                case Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics.Variable_0_implicitly_has_an_1_type.code;
                case Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics.Parameter_0_implicitly_has_an_1_type.code;
                case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code;
                case Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage.code:
                    return Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code;
                case Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code;
                case Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage.code:
                    return Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code;
                case Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics.Member_0_implicitly_has_an_1_type.code;
            }
            return errorCode;
        }