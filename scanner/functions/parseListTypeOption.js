function parseListTypeOption(opt, value = "", errors) {
            value = trimString(value);
            if (startsWith(value, "-")) {
                return void 0;
            }
            if (opt.type === "listOrElement" && !stringContains(value, ",")) {
                return validateJsonOptionValue(opt, value, errors);
            }
            if (value === "") {
                return [];
            }
            const values = value.split(",");
            switch (opt.element.type) {
                case "number":
                    return mapDefined(values, (v) => validateJsonOptionValue(opt.element, parseInt(v), errors));
                case "string":
                    return mapDefined(values, (v) => validateJsonOptionValue(opt.element, v || "", errors));
                case "boolean":
                case "object":
                    return Debug.fail(`List of ${opt.element.type} is not yet supported.`);
                default:
                    return mapDefined(values, (v) => parseCustomTypeOption(opt.element, v, errors));
            }
        }