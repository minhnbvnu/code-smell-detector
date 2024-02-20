function validateSpecs(specs, errors, disallowTrailingRecursion, jsonSourceFile, specKey) {
            return specs.filter((spec) => {
                if (!isString(spec))
                    return false;
                const diag2 = specToDiagnostic(spec, disallowTrailingRecursion);
                if (diag2 !== void 0) {
                    errors.push(createDiagnostic(...diag2));
                }
                return diag2 === void 0;
            });
            function createDiagnostic(message, spec) {
                const element = getTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec);
                return element ? createDiagnosticForNodeInSourceFile(jsonSourceFile, element, message, spec) : createCompilerDiagnostic(message, spec);
            }
        }