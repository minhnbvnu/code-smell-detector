function inferTypeForVariableFromUsage(token, program, cancellationToken) {
            const references = getReferences(token, program, cancellationToken);
            return inferTypeFromReferences(program, references, cancellationToken).single();
        }