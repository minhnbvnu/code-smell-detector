function getStrictModeIdentifierMessage(node) {
                if (getContainingClass(node)) {
                    return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode;
                }
                if (file.externalModuleIndicator) {
                    return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode;
                }
                return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode;
            }