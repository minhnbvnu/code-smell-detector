function shouldEmitBlockFunctionBodyOnSingleLine(body) {
                if (getEmitFlags(body) & 1 /* SingleLine */) {
                    return true;
                }
                if (body.multiLine) {
                    return false;
                }
                if (!nodeIsSynthesized(body) && currentSourceFile && !rangeIsOnSingleLine(body, currentSourceFile)) {
                    return false;
                }
                if (getLeadingLineTerminatorCount(body, firstOrUndefined(body.statements), 2 /* PreserveLines */) || getClosingLineTerminatorCount(body, lastOrUndefined(body.statements), 2 /* PreserveLines */, body.statements)) {
                    return false;
                }
                let previousStatement;
                for (const statement of body.statements) {
                    if (getSeparatingLineTerminatorCount(previousStatement, statement, 2 /* PreserveLines */) > 0) {
                        return false;
                    }
                    previousStatement = statement;
                }
                return true;
            }