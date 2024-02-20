function isCompilerOptionsValue(option, value) {
            if (option) {
                if (isNullOrUndefined(value))
                    return true;
                if (option.type === "list") {
                    return isArray(value);
                }
                if (option.type === "listOrElement") {
                    return isArray(value) || isCompilerOptionsValue(option.element, value);
                }
                const expectedType = isString(option.type) ? option.type : "string";
                return typeof value === expectedType;
            }
            return false;
        }