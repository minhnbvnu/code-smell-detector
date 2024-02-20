function getCustomTypeMapOfCommandLineOption(optionDefinition) {
            switch (optionDefinition.type) {
                case "string":
                case "number":
                case "boolean":
                case "object":
                    return void 0;
                case "list":
                case "listOrElement":
                    return getCustomTypeMapOfCommandLineOption(optionDefinition.element);
                default:
                    return optionDefinition.type;
            }
        }