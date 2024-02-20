function textSpanContainsTextSpan(span, other) {
            return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
        }