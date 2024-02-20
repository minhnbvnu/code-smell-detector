function createTextSpan(start, length2) {
            if (start < 0) {
                throw new Error("start < 0");
            }
            if (length2 < 0) {
                throw new Error("length < 0");
            }
            return { start, length: length2 };
        }