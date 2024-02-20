function needAllowJs() {
                return getAllowJSCompilerOption(options) || !getStrictOptionValue(options, "noImplicitAny") ? void 0 : Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
            }