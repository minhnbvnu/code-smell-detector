function createOutliningSpanFromBounds(pos, end, kind) {
            return createOutliningSpan(createTextSpanFromBounds(pos, end), kind);
        }