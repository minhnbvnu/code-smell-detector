function verifyDeprecatedProjectReference(ref, parentFile, index) {
                function createDiagnostic(_name, _value, _useInstead, message, arg0, arg1, arg2, arg3) {
                    createDiagnosticForReference(parentFile, index, message, arg0, arg1, arg2, arg3);
                }
                checkDeprecations("5.0", "5.5", createDiagnostic, (createDeprecatedDiagnostic) => {
                    if (ref.prepend) {
                        createDeprecatedDiagnostic("prepend");
                    }
                });
            }