function classifyLeadingTriviaAndGetTokenStart(token) {
                triviaScanner.setTextPos(token.pos);
                while (true) {
                    const start = triviaScanner.getTextPos();
                    if (!couldStartTrivia(sourceFile.text, start)) {
                        return start;
                    }
                    const kind = triviaScanner.scan();
                    const end = triviaScanner.getTextPos();
                    const width = end - start;
                    if (!isTrivia(kind)) {
                        return start;
                    }
                    switch (kind) {
                        case 4 /* NewLineTrivia */:
                        case 5 /* WhitespaceTrivia */:
                            continue;
                        case 2 /* SingleLineCommentTrivia */:
                        case 3 /* MultiLineCommentTrivia */:
                            classifyComment(token, kind, start, width);
                            triviaScanner.setTextPos(end);
                            continue;
                        case 7 /* ConflictMarkerTrivia */:
                            const text = sourceFile.text;
                            const ch = text.charCodeAt(start);
                            if (ch === 60 /* lessThan */ || ch === 62 /* greaterThan */) {
                                pushClassification(start, width, 1 /* comment */);
                                continue;
                            }
                            Debug.assert(ch === 124 /* bar */ || ch === 61 /* equals */);
                            classifyDisabledMergeCode(text, start, end);
                            break;
                        case 6 /* ShebangTrivia */:
                            break;
                        default:
                            Debug.assertNever(kind);
                    }
                }
            }