function convertJsonOption(opt, value, basePath, errors) {
            if (isCompilerOptionsValue(opt, value)) {
                const optType = opt.type;
                if (optType === "list" && isArray(value)) {
                    return convertJsonOptionOfListType(opt, value, basePath, errors);
                }
                else if (optType === "listOrElement") {
                    return isArray(value) ? convertJsonOptionOfListType(opt, value, basePath, errors) : convertJsonOption(opt.element, value, basePath, errors);
                }
                else if (!isString(opt.type)) {
                    return convertJsonOptionOfCustomType(opt, value, errors);
                }
                const validatedValue = validateJsonOptionValue(opt, value, errors);
                return isNullOrUndefined(validatedValue) ? validatedValue : normalizeNonListOptionValue(opt, basePath, validatedValue);
            }
            else {
                errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, getCompilerOptionValueTypeString(opt)));
            }
        }