function convertJsonOptionOfCustomType(opt, value, errors) {
            if (isNullOrUndefined(value))
                return void 0;
            const key = value.toLowerCase();
            const val = opt.type.get(key);
            if (val !== void 0) {
                return validateJsonOptionValue(opt, val, errors);
            }
            else {
                errors.push(createCompilerDiagnosticForInvalidCustomType(opt));
            }
        }