function optionsHaveModuleResolutionChanges(oldOptions, newOptions) {
            return optionsHaveChanges(oldOptions, newOptions, moduleResolutionOptionDeclarations);
        }