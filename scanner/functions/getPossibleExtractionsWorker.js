function getPossibleExtractionsWorker(targetRange, context) {
            const { file: sourceFile } = context;
            const scopes = collectEnclosingScopes(targetRange);
            const enclosingTextRange = getEnclosingTextRange(targetRange, sourceFile);
            const readsAndWrites = collectReadsAndWrites(targetRange, scopes, enclosingTextRange, sourceFile, context.program.getTypeChecker(), context.cancellationToken);
            return { scopes, readsAndWrites };
        }