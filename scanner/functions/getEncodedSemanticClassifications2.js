function getEncodedSemanticClassifications2(program, cancellationToken, sourceFile, span) {
            return {
                spans: getSemanticTokens(program, sourceFile, span, cancellationToken),
                endOfLineState: 0 /* None */
            };
        }