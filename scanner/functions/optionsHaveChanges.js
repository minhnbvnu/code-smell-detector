function optionsHaveChanges(oldOptions, newOptions, optionDeclarations2) {
            return oldOptions !== newOptions && optionDeclarations2.some((o) => !isJsonEqual(getCompilerOptionValue(oldOptions, o), getCompilerOptionValue(newOptions, o)));
        }