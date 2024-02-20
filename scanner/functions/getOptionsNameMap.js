function getOptionsNameMap() {
            return optionsNameMapCache || (optionsNameMapCache = createOptionNameMap(optionDeclarations));
        }