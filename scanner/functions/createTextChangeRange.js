function createTextChangeRange(span, newLength) {
            if (newLength < 0) {
                throw new Error("newLength < 0");
            }
            return { span, newLength };
        }