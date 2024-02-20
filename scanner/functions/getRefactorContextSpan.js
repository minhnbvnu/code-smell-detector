function getRefactorContextSpan({ startPosition, endPosition }) {
            return createTextSpanFromBounds(startPosition, endPosition === void 0 ? startPosition : endPosition);
        }