function getCompilerOptionValueTypeString(option) {
            return option.type === "listOrElement" ? `${getCompilerOptionValueTypeString(option.element)} or Array` : option.type === "list" ? "Array" : isString(option.type) ? option.type : "string";
        }