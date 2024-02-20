function isPreviousPropertyDeclarationTerminated(contextToken2, position2) {
                return contextToken2.kind !== 63 /* EqualsToken */ && (contextToken2.kind === 26 /* SemicolonToken */ || !positionsAreOnSameLine(contextToken2.end, position2, sourceFile));
            }