function getSignatureHelpItems(program, sourceFile, position, triggerReason, cancellationToken) {
            const typeChecker = program.getTypeChecker();
            const startingToken = findTokenOnLeftOfPosition(sourceFile, position);
            if (!startingToken) {
                return void 0;
            }
            const onlyUseSyntacticOwners = !!triggerReason && triggerReason.kind === "characterTyped";
            if (onlyUseSyntacticOwners && (isInString(sourceFile, position, startingToken) || isInComment(sourceFile, position))) {
                return void 0;
            }
            const isManuallyInvoked = !!triggerReason && triggerReason.kind === "invoked";
            const argumentInfo = getContainingArgumentInfo(startingToken, position, sourceFile, typeChecker, isManuallyInvoked);
            if (!argumentInfo)
                return void 0;
            cancellationToken.throwIfCancellationRequested();
            const candidateInfo = getCandidateOrTypeInfo(argumentInfo, typeChecker, sourceFile, startingToken, onlyUseSyntacticOwners);
            cancellationToken.throwIfCancellationRequested();
            if (!candidateInfo) {
                return isSourceFileJS(sourceFile) ? createJSSignatureHelpItems(argumentInfo, program, cancellationToken) : void 0;
            }
            return typeChecker.runWithCancellationToken(cancellationToken, (typeChecker2) => candidateInfo.kind === 0 /* Candidate */ ? createSignatureHelpItems(candidateInfo.candidates, candidateInfo.resolvedSignature, argumentInfo, sourceFile, typeChecker2) : createTypeHelpItems(candidateInfo.symbol, argumentInfo, sourceFile, typeChecker2));
        }