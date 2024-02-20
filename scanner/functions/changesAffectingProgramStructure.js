function changesAffectingProgramStructure(oldOptions, newOptions) {
            return optionsHaveChanges(oldOptions, newOptions, optionsAffectingProgramStructure);
        }