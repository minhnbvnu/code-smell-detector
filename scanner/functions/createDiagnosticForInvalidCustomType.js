function createDiagnosticForInvalidCustomType(opt, createDiagnostic) {
            const namesOfType = arrayFrom(opt.type.keys());
            const stringNames = (opt.deprecatedKeys ? namesOfType.filter((k) => !opt.deprecatedKeys.has(k)) : namesOfType).map((key) => `'${key}'`).join(", ");
            return createDiagnostic(Diagnostics.Argument_for_0_option_must_be_Colon_1, `--${opt.name}`, stringNames);
        }