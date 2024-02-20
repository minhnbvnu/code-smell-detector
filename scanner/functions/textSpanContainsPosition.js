function textSpanContainsPosition(span, position) {
            return position >= span.start && position < textSpanEnd(span);
        }