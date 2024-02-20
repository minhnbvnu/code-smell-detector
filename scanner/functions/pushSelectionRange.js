function pushSelectionRange(start, end) {
                if (start !== end) {
                    const textSpan = createTextSpanFromBounds(start, end);
                    if (!selectionRange || // Skip ranges that are identical to the parent
                        !textSpansEqual(textSpan, selectionRange.textSpan) && // Skip ranges that don’t contain the original position
                            textSpanIntersectsWithPosition(textSpan, pos)) {
                        selectionRange = { textSpan, ...selectionRange && { parent: selectionRange } };
                    }
                }
            }