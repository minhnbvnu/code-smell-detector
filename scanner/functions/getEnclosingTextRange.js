function getEnclosingTextRange(targetRange, sourceFile) {
            return isReadonlyArray(targetRange.range) ? { pos: first(targetRange.range).getStart(sourceFile), end: last(targetRange.range).getEnd() } : targetRange.range;
        }