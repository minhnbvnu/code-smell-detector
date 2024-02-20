function createDiagnosticForOptionPathKeyValue(key, valueIndex, message, arg0, arg1, arg2) {
                let needCompilerDiagnostic = true;
                const pathsSyntax = getOptionPathsSyntax();
                for (const pathProp of pathsSyntax) {
                    if (isObjectLiteralExpression(pathProp.initializer)) {
                        for (const keyProps of getPropertyAssignment(pathProp.initializer, key)) {
                            const initializer = keyProps.initializer;
                            if (isArrayLiteralExpression(initializer) && initializer.elements.length > valueIndex) {
                                programDiagnostics.add(createDiagnosticForNodeInSourceFile(options.configFile, initializer.elements[valueIndex], message, arg0, arg1, arg2));
                                needCompilerDiagnostic = false;
                            }
                        }
                    }
                }
                if (needCompilerDiagnostic) {
                    programDiagnostics.add(createCompilerDiagnostic(message, arg0, arg1, arg2));
                }
            }