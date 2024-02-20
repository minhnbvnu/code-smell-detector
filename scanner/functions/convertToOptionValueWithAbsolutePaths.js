function convertToOptionValueWithAbsolutePaths(option, value, toAbsolutePath) {
            if (option && !isNullOrUndefined(value)) {
                if (option.type === "list") {
                    const values = value;
                    if (option.element.isFilePath && values.length) {
                        return values.map(toAbsolutePath);
                    }
                }
                else if (option.isFilePath) {
                    return toAbsolutePath(value);
                }
                Debug.assert(option.type !== "listOrElement");
            }
            return value;
        }