function convertToReusableCompilerOptionValue(option, value, relativeToBuildInfo) {
            if (option) {
                Debug.assert(option.type !== "listOrElement");
                if (option.type === "list") {
                    const values = value;
                    if (option.element.isFilePath && values.length) {
                        return values.map(relativeToBuildInfo);
                    }
                }
                else if (option.isFilePath) {
                    return relativeToBuildInfo(value);
                }
            }
            return value;
        }