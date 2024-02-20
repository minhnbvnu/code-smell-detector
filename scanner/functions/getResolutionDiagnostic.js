function getResolutionDiagnostic(options, { extension }, { isDeclarationFile }) {
            switch (extension) {
                case ".ts" /* Ts */:
                case ".d.ts" /* Dts */:
                case ".mts" /* Mts */:
                case ".d.mts" /* Dmts */:
                case ".cts" /* Cts */:
                case ".d.cts" /* Dcts */:
                    return void 0;
                case ".tsx" /* Tsx */:
                    return needJsx();
                case ".jsx" /* Jsx */:
                    return needJsx() || needAllowJs();
                case ".js" /* Js */:
                case ".mjs" /* Mjs */:
                case ".cjs" /* Cjs */:
                    return needAllowJs();
                case ".json" /* Json */:
                    return needResolveJsonModule();
                default:
                    return needAllowArbitraryExtensions();
            }
            function needJsx() {
                return options.jsx ? void 0 : Diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set;
            }
            function needAllowJs() {
                return getAllowJSCompilerOption(options) || !getStrictOptionValue(options, "noImplicitAny") ? void 0 : Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
            }
            function needResolveJsonModule() {
                return getResolveJsonModule(options) ? void 0 : Diagnostics.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used;
            }
            function needAllowArbitraryExtensions() {
                return isDeclarationFile || options.allowArbitraryExtensions ? void 0 : Diagnostics.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set;
            }
        }