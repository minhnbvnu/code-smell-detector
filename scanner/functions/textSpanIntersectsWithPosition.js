function textSpanIntersectsWithPosition(span, position) {
            return position <= textSpanEnd(span) && position >= span.start;
        }