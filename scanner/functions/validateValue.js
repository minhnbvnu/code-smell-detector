function validateValue(value) {
                    var _a2;
                    if (!invalidReported) {
                        const diagnostic = (_a2 = option == null ? void 0 : option.extraValidation) == null ? void 0 : _a2.call(option, value);
                        if (diagnostic) {
                            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, ...diagnostic));
                            return void 0;
                        }
                    }
                    return value;
                }