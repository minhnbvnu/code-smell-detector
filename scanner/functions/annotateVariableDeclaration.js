function annotateVariableDeclaration(changes, importAdder, sourceFile, declaration, program, host, cancellationToken) {
            if (isIdentifier(declaration.name)) {
                annotate(changes, importAdder, sourceFile, declaration, inferTypeForVariableFromUsage(declaration.name, program, cancellationToken), program, host);
            }
        }