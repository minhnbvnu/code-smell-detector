function inferTypeForParametersFromUsage(func, sourceFile, program, cancellationToken) {
            const references = getFunctionReferences(func, sourceFile, program, cancellationToken);
            return references && inferTypeFromReferences(program, references, cancellationToken).parameters(func) || func.parameters.map((p) => ({
                declaration: p,
                type: isIdentifier(p.name) ? inferTypeForVariableFromUsage(p.name, program, cancellationToken) : program.getTypeChecker().getAnyType()
            }));
        }