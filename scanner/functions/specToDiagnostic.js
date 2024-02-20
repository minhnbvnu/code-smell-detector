function specToDiagnostic(spec, disallowTrailingRecursion) {
            Debug.assert(typeof spec === "string");
            if (disallowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
                return [Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec];
            }
            else if (invalidDotDotAfterRecursiveWildcard(spec)) {
                return [Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec];
            }
        }