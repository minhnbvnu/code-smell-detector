function createDiagnosticForReference(sourceFile, index, message, arg0, arg1, arg2, arg3) {
                const referencesSyntax = firstDefined(getTsConfigPropArray(sourceFile || options.configFile, "references"), (property) => isArrayLiteralExpression(property.initializer) ? property.initializer : void 0);
                if (referencesSyntax && referencesSyntax.elements.length > index) {
                    programDiagnostics.add(createDiagnosticForNodeInSourceFile(sourceFile || options.configFile, referencesSyntax.elements[index], message, arg0, arg1, arg2, arg3));
                }
                else {
                    programDiagnostics.add(createCompilerDiagnostic(message, arg0, arg1, arg2, arg3));
                }
            }