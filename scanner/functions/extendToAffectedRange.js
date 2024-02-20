function extendToAffectedRange(sourceFile, changeRange) {
                        const maxLookahead = 1;
                        let start = changeRange.span.start;
                        for (let i = 0; start > 0 && i <= maxLookahead; i++) {
                            const nearestNode = findNearestNodeStartingBeforeOrAtPosition(sourceFile, start);
                            Debug.assert(nearestNode.pos <= start);
                            const position = nearestNode.pos;
                            start = Math.max(0, position - 1);
                        }
                        const finalSpan = createTextSpanFromBounds(start, textSpanEnd(changeRange.span));
                        const finalLength = changeRange.newLength + (changeRange.span.start - start);
                        return createTextChangeRange(finalSpan, finalLength);
                    }