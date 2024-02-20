function getPropFromRaw(prop, validateElement, elementTypeName) {
                if (hasProperty(raw, prop) && !isNullOrUndefined(raw[prop])) {
                    if (isArray(raw[prop])) {
                        const result = raw[prop];
                        if (!sourceFile && !every(result, validateElement)) {
                            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, elementTypeName));
                        }
                        return result;
                    }
                    else {
                        createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, "Array");
                        return "not-array";
                    }
                }
                return "no-prop";
            }