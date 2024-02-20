function optionToDefinition(option, defaults) {
                if (!option) {
                    return defaults;
                }
                return typeof option === "string"
                    ? optionDefinitions[option]
                    : Object.assign({}, defaults, option);
            }