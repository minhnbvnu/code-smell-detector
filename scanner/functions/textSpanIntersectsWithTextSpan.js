function textSpanIntersectsWithTextSpan(span, other) {
            return decodedTextSpanIntersectsWith(span.start, span.length, other.start, other.length);
        }