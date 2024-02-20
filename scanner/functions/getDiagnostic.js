function getDiagnostic(errorCode, token) {
            switch (errorCode) {
                case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                case Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return isSetAccessorDeclaration(getContainingFunction(token)) ? Diagnostics.Infer_type_of_0_from_usage : Diagnostics.Infer_parameter_types_from_usage;
                case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code:
                    return Diagnostics.Infer_parameter_types_from_usage;
                case Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code:
                    return Diagnostics.Infer_this_type_of_0_from_usage;
                default:
                    return Diagnostics.Infer_type_of_0_from_usage;
            }
        }