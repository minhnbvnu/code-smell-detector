function applyRuleEdits(rule2, previousRange2, previousStartLine, currentRange, currentStartLine) {
                const onLaterLine = currentStartLine !== previousStartLine;
                switch (rule2.action) {
                    case 1 /* StopProcessingSpaceActions */:
                        return 0 /* None */;
                    case 16 /* DeleteSpace */:
                        if (previousRange2.end !== currentRange.pos) {
                            recordDelete(previousRange2.end, currentRange.pos - previousRange2.end);
                            return onLaterLine ? 2 /* LineRemoved */ : 0 /* None */;
                        }
                        break;
                    case 32 /* DeleteToken */:
                        recordDelete(previousRange2.pos, previousRange2.end - previousRange2.pos);
                        break;
                    case 8 /* InsertNewLine */:
                        if (rule2.flags !== 1 /* CanDeleteNewLines */ && previousStartLine !== currentStartLine) {
                            return 0 /* None */;
                        }
                        const lineDelta = currentStartLine - previousStartLine;
                        if (lineDelta !== 1) {
                            recordReplace(previousRange2.end, currentRange.pos - previousRange2.end, getNewLineOrDefaultFromHost(host, options));
                            return onLaterLine ? 0 /* None */ : 1 /* LineAdded */;
                        }
                        break;
                    case 4 /* InsertSpace */:
                        if (rule2.flags !== 1 /* CanDeleteNewLines */ && previousStartLine !== currentStartLine) {
                            return 0 /* None */;
                        }
                        const posDelta = currentRange.pos - previousRange2.end;
                        if (posDelta !== 1 || sourceFile.text.charCodeAt(previousRange2.end) !== 32 /* space */) {
                            recordReplace(previousRange2.end, currentRange.pos - previousRange2.end, " ");
                            return onLaterLine ? 2 /* LineRemoved */ : 0 /* None */;
                        }
                        break;
                    case 64 /* InsertTrailingSemicolon */:
                        recordInsert(previousRange2.end, ";");
                }
                return 0 /* None */;
            }