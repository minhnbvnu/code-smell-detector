function compilerOptionsAffectDeclarationPath(newOptions, oldOptions) {
            return optionsHaveChanges(oldOptions, newOptions, affectsDeclarationPathOptionDeclarations);
        }