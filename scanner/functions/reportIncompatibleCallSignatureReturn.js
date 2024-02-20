function reportIncompatibleCallSignatureReturn(siga, sigb) {
                    if (siga.parameters.length === 0 && sigb.parameters.length === 0) {
                        return (source2, target2) => reportIncompatibleError(Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1, typeToString(source2), typeToString(target2));
                    }
                    return (source2, target2) => reportIncompatibleError(Diagnostics.Call_signature_return_types_0_and_1_are_incompatible, typeToString(source2), typeToString(target2));
                }