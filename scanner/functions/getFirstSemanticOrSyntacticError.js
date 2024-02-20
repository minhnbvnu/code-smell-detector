function getFirstSemanticOrSyntacticError(program, ast) {
        try {
            const supportedSyntacticDiagnostics = whitelistSupportedDiagnostics(program.getSyntacticDiagnostics(ast));
            if (supportedSyntacticDiagnostics.length) {
                return convertDiagnosticToSemanticOrSyntacticError(supportedSyntacticDiagnostics[0]);
            }
            const supportedSemanticDiagnostics = whitelistSupportedDiagnostics(program.getSemanticDiagnostics(ast));
            if (supportedSemanticDiagnostics.length) {
                return convertDiagnosticToSemanticOrSyntacticError(supportedSemanticDiagnostics[0]);
            }
            return undefined;
        }
        catch (e) {
            /**
             * TypeScript compiler has certain Debug.fail() statements in, which will cause the diagnostics
             * retrieval above to throw.
             *
             * E.g. from ast-alignment-tests
             * "Debug Failure. Shouldn't ever directly check a JsxOpeningElement"
             *
             * For our current use-cases this is undesired behavior, so we just suppress it
             * and log a a warning.
             */
            /* istanbul ignore next */
            console.warn(`Warning From TSC: "${e.message}`); // eslint-disable-line no-console
            /* istanbul ignore next */
            return undefined;
        }
    }