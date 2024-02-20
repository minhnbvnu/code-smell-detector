function compilerOptionsAffectEmit(newOptions, oldOptions) {
            return optionsHaveChanges(oldOptions, newOptions, affectsEmitOptionDeclarations);
        }