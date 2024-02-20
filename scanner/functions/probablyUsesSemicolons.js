function probablyUsesSemicolons(sourceFile) {
            let withSemicolon = 0;
            let withoutSemicolon = 0;
            const nStatementsToObserve = 5;
            forEachChild(sourceFile, function visit(node) {
                if (syntaxRequiresTrailingSemicolonOrASI(node.kind)) {
                    const lastToken = node.getLastToken(sourceFile);
                    if ((lastToken == null ? void 0 : lastToken.kind) === 26 /* SemicolonToken */) {
                        withSemicolon++;
                    }
                    else {
                        withoutSemicolon++;
                    }
                }
                else if (syntaxRequiresTrailingCommaOrSemicolonOrASI(node.kind)) {
                    const lastToken = node.getLastToken(sourceFile);
                    if ((lastToken == null ? void 0 : lastToken.kind) === 26 /* SemicolonToken */) {
                        withSemicolon++;
                    }
                    else if (lastToken && lastToken.kind !== 27 /* CommaToken */) {
                        const lastTokenLine = getLineAndCharacterOfPosition(sourceFile, lastToken.getStart(sourceFile)).line;
                        const nextTokenLine = getLineAndCharacterOfPosition(sourceFile, getSpanOfTokenAtPosition(sourceFile, lastToken.end).start).line;
                        if (lastTokenLine !== nextTokenLine) {
                            withoutSemicolon++;
                        }
                    }
                }
                if (withSemicolon + withoutSemicolon >= nStatementsToObserve) {
                    return true;
                }
                return forEachChild(node, visit);
            });
            if (withSemicolon === 0 && withoutSemicolon <= 1) {
                return true;
            }
            return withSemicolon / withoutSemicolon > 1 / nStatementsToObserve;
        }