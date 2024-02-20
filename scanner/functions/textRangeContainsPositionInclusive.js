function textRangeContainsPositionInclusive(span, position) {
            return position >= span.pos && position <= span.end;
        }