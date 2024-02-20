function reportInvalidOptionValue(isError) {
                    if (isError) {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, option.name, getCompilerOptionValueTypeString(option)));
                        invalidReported = true;
                    }
                }