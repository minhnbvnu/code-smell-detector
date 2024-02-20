function getOptionValueWithEmptyStrings(value, option) {
            switch (option.type) {
                case "object":
                    return "";
                case "string":
                    return "";
                case "number":
                    return typeof value === "number" ? value : "";
                case "boolean":
                    return typeof value === "boolean" ? value : "";
                case "listOrElement":
                    if (!isArray(value))
                        return getOptionValueWithEmptyStrings(value, option.element);
                case "list":
                    const elementType = option.element;
                    return isArray(value) ? value.map((v) => getOptionValueWithEmptyStrings(v, elementType)) : "";
                default:
                    return forEachEntry(option.type, (optionEnumValue, optionStringValue) => {
                        if (optionEnumValue === value) {
                            return optionStringValue;
                        }
                    });
            }
        }