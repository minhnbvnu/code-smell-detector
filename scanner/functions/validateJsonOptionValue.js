function validateJsonOptionValue(opt, value, errors) {
            var _a2;
            if (isNullOrUndefined(value))
                return void 0;
            const d = (_a2 = opt.extraValidation) == null ? void 0 : _a2.call(opt, value);
            if (!d)
                return value;
            errors.push(createCompilerDiagnostic(...d));
            return void 0;
        }