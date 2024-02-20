function emitCaseOrDefaultClauseRest(parentNode, statements, colonPos) {
                const emitAsSingleStatement = statements.length === 1 && // treat synthesized nodes as located on the same line for emit purposes
                    (!currentSourceFile || nodeIsSynthesized(parentNode) || nodeIsSynthesized(statements[0]) || rangeStartPositionsAreOnSameLine(parentNode, statements[0], currentSourceFile));
                let format = 163969 /* CaseOrDefaultClauseStatements */;
                if (emitAsSingleStatement) {
                    writeToken(58 /* ColonToken */, colonPos, writePunctuation, parentNode);
                    writeSpace();
                    format &= ~(1 /* MultiLine */ | 128 /* Indented */);
                }
                else {
                    emitTokenWithComment(58 /* ColonToken */, colonPos, writePunctuation, parentNode);
                }
                emitList(parentNode, statements, format);
            }