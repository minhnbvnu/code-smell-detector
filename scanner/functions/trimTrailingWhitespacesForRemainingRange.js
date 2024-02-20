function trimTrailingWhitespacesForRemainingRange(trivias) {
                let startPos = previousRange ? previousRange.end : originalRange.pos;
                for (const trivia of trivias) {
                    if (isComment(trivia.kind)) {
                        if (startPos < trivia.pos) {
                            trimTrailingWitespacesForPositions(startPos, trivia.pos - 1, previousRange);
                        }
                        startPos = trivia.end + 1;
                    }
                }
                if (startPos < originalRange.end) {
                    trimTrailingWitespacesForPositions(startPos, originalRange.end, previousRange);
                }
            }