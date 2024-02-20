function verifyDeprecatedCompilerOptions() {
                function createDiagnostic(name, value, useInstead, message, arg0, arg1, arg2, arg3) {
                    if (useInstead) {
                        const details = chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.Use_0_instead, useInstead);
                        const chain = chainDiagnosticMessages(details, message, arg0, arg1, arg2, arg3);
                        createDiagnosticForOption(
                        /*onKey*/
                        !value, name, 
                        /*option2*/
                        void 0, chain);
                    }
                    else {
                        createDiagnosticForOption(
                        /*onKey*/
                        !value, name, 
                        /*option2*/
                        void 0, message, arg0, arg1, arg2, arg3);
                    }
                }
                checkDeprecations("5.0", "5.5", createDiagnostic, (createDeprecatedDiagnostic) => {
                    if (options.target === 0 /* ES3 */) {
                        createDeprecatedDiagnostic("target", "ES3");
                    }
                    if (options.noImplicitUseStrict) {
                        createDeprecatedDiagnostic("noImplicitUseStrict");
                    }
                    if (options.keyofStringsOnly) {
                        createDeprecatedDiagnostic("keyofStringsOnly");
                    }
                    if (options.suppressExcessPropertyErrors) {
                        createDeprecatedDiagnostic("suppressExcessPropertyErrors");
                    }
                    if (options.suppressImplicitAnyIndexErrors) {
                        createDeprecatedDiagnostic("suppressImplicitAnyIndexErrors");
                    }
                    if (options.noStrictGenericChecks) {
                        createDeprecatedDiagnostic("noStrictGenericChecks");
                    }
                    if (options.charset) {
                        createDeprecatedDiagnostic("charset");
                    }
                    if (options.out) {
                        createDeprecatedDiagnostic("out", 
                        /*value*/
                        void 0, "outFile");
                    }
                    if (options.importsNotUsedAsValues) {
                        createDeprecatedDiagnostic("importsNotUsedAsValues", 
                        /*value*/
                        void 0, "verbatimModuleSyntax");
                    }
                    if (options.preserveValueImports) {
                        createDeprecatedDiagnostic("preserveValueImports", 
                        /*value*/
                        void 0, "verbatimModuleSyntax");
                    }
                });
            }