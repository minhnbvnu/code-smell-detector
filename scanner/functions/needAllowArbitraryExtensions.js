function needAllowArbitraryExtensions() {
                return isDeclarationFile || options.allowArbitraryExtensions ? void 0 : Diagnostics.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set;
            }