function compilerOptionValueToString(value) {
            var _a2;
            if (value === null || typeof value !== "object") {
                return "" + value;
            }
            if (isArray(value)) {
                return `[${(_a2 = value.map((e) => compilerOptionValueToString(e))) == null ? void 0 : _a2.join(",")}]`;
            }
            let str = "{";
            for (const key in value) {
                if (hasProperty(value, key)) {
                    str += `${key}: ${compilerOptionValueToString(value[key])}`;
                }
            }
            return str + "}";
        }