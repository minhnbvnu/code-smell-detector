function annotateThis(changes, sourceFile, containingFunction, program, host, cancellationToken) {
            const references = getFunctionReferences(containingFunction, sourceFile, program, cancellationToken);
            if (!references || !references.length) {
                return;
            }
            const thisInference = inferTypeFromReferences(program, references, cancellationToken).thisParameter();
            const typeNode = getTypeNodeIfAccessible(thisInference, containingFunction, program, host);
            if (!typeNode) {
                return;
            }
            if (isInJSFile(containingFunction)) {
                annotateJSDocThis(changes, sourceFile, containingFunction, typeNode);
            }
            else {
                changes.tryInsertThisTypeAnnotation(sourceFile, containingFunction, typeNode);
            }
        }