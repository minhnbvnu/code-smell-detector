function compilerOptionsAffectSemanticDiagnostics(newOptions, oldOptions) {
            return optionsHaveChanges(oldOptions, newOptions, semanticDiagnosticsOptionDeclarations);
        }