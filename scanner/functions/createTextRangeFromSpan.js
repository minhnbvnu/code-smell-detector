function createTextRangeFromSpan(span) {
            return createRange(span.start, span.start + span.length);
        }