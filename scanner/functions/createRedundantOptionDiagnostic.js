function createRedundantOptionDiagnostic(errorOnOption, redundantWithOption) {
                const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
                if (compilerOptionsObjectLiteralSyntax) {
                    createOptionDiagnosticInObjectLiteralSyntax(compilerOptionsObjectLiteralSyntax, 
                    /*onKey*/
                    true, errorOnOption, 
                    /*key2*/
                    void 0, Diagnostics.Option_0_is_redundant_and_cannot_be_specified_with_option_1, errorOnOption, redundantWithOption);
                }
                else {
                    createDiagnosticForOptionName(Diagnostics.Option_0_is_redundant_and_cannot_be_specified_with_option_1, errorOnOption, redundantWithOption);
                }
            }