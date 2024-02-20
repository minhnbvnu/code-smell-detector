function getDefaultValueForOption(option) {
            switch (option.type) {
                case "number":
                    return 1;
                case "boolean":
                    return true;
                case "string":
                    const defaultValue = option.defaultValueDescription;
                    return option.isFilePath ? `./${defaultValue && typeof defaultValue === "string" ? defaultValue : ""}` : "";
                case "list":
                    return [];
                case "listOrElement":
                    return getDefaultValueForOption(option.element);
                case "object":
                    return {};
                default:
                    const value = firstOrUndefinedIterator(option.type.keys());
                    if (value !== void 0)
                        return value;
                    return Debug.fail("Expected 'option.type' to have entries.");
            }
        }