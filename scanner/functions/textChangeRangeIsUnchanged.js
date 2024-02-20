function textChangeRangeIsUnchanged(range) {
            return textSpanIsEmpty(range.span) && range.newLength === 0;
        }