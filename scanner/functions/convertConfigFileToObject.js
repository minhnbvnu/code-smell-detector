function convertConfigFileToObject(sourceFile, errors, reportOptionsErrors, optionsIterator) {
            var _a2;
            const rootExpression = (_a2 = sourceFile.statements[0]) == null ? void 0 : _a2.expression;
            const knownRootOptions = reportOptionsErrors ? getTsconfigRootOptionsMap() : void 0;
            if (rootExpression && rootExpression.kind !== 207 /* ObjectLiteralExpression */) {
                errors.push(createDiagnosticForNodeInSourceFile(sourceFile, rootExpression, Diagnostics.The_root_value_of_a_0_file_must_be_an_object, getBaseFileName(sourceFile.fileName) === "jsconfig.json" ? "jsconfig.json" : "tsconfig.json"));
                if (isArrayLiteralExpression(rootExpression)) {
                    const firstObject = find(rootExpression.elements, isObjectLiteralExpression);
                    if (firstObject) {
                        return convertToObjectWorker(sourceFile, firstObject, errors, 
                        /*returnValue*/
                        true, knownRootOptions, optionsIterator);
                    }
                }
                return {};
            }
            return convertToObjectWorker(sourceFile, rootExpression, errors, 
            /*returnValue*/
            true, knownRootOptions, optionsIterator);
        }