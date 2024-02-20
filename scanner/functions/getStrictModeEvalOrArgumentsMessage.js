function getStrictModeEvalOrArgumentsMessage(node) {
                if (getContainingClass(node)) {
                    return Diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode;
                }
                if (file.externalModuleIndicator) {
                    return Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
                }
                return Diagnostics.Invalid_use_of_0_in_strict_mode;
            }