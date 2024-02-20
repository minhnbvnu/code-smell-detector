function annotateSetAccessor(changes, importAdder, sourceFile, setAccessorDeclaration, program, host, cancellationToken) {
            const param = firstOrUndefined(setAccessorDeclaration.parameters);
            if (param && isIdentifier(setAccessorDeclaration.name) && isIdentifier(param.name)) {
                let type = inferTypeForVariableFromUsage(setAccessorDeclaration.name, program, cancellationToken);
                if (type === program.getTypeChecker().getAnyType()) {
                    type = inferTypeForVariableFromUsage(param.name, program, cancellationToken);
                }
                if (isInJSFile(setAccessorDeclaration)) {
                    annotateJSDocParameters(changes, sourceFile, [{ declaration: param, type }], program, host);
                }
                else {
                    annotate(changes, importAdder, sourceFile, param, type, program, host);
                }
            }
        }