function collapseTextChangeRangesAcrossMultipleVersions(changes) {
            if (changes.length === 0) {
                return unchangedTextChangeRange;
            }
            if (changes.length === 1) {
                return changes[0];
            }
            const change0 = changes[0];
            let oldStartN = change0.span.start;
            let oldEndN = textSpanEnd(change0.span);
            let newEndN = oldStartN + change0.newLength;
            for (let i = 1; i < changes.length; i++) {
                const nextChange = changes[i];
                const oldStart1 = oldStartN;
                const oldEnd1 = oldEndN;
                const newEnd1 = newEndN;
                const oldStart2 = nextChange.span.start;
                const oldEnd2 = textSpanEnd(nextChange.span);
                const newEnd2 = oldStart2 + nextChange.newLength;
                oldStartN = Math.min(oldStart1, oldStart2);
                oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
                newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
            }
            return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), 
            /*newLength*/
            newEndN - oldStartN);
        }