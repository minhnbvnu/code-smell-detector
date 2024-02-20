function changesAffectModuleResolution(oldOptions, newOptions) {
            return oldOptions.configFilePath !== newOptions.configFilePath || optionsHaveModuleResolutionChanges(oldOptions, newOptions);
        }