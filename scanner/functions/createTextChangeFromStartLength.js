function createTextChangeFromStartLength(start, length2, newText) {
            return createTextChange(createTextSpan(start, length2), newText);
        }