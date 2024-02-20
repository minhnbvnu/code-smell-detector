function pushEncodedClassification(start, end, offset, classification, result) {
            if (classification === 8 /* whiteSpace */) {
                return;
            }
            if (start === 0 && offset > 0) {
                start += offset;
            }
            const length2 = end - start;
            if (length2 > 0) {
                result.push(start - offset, length2, classification);
            }
        }