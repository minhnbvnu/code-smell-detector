function prepareRangeContainsErrorFunction(errors, originalRange) {
            if (!errors.length) {
                return rangeHasNoErrors;
            }
            const sorted = errors.filter((d) => rangeOverlapsWithStartEnd(originalRange, d.start, d.start + d.length)).sort((e1, e2) => e1.start - e2.start);
            if (!sorted.length) {
                return rangeHasNoErrors;
            }
            let index = 0;
            return (r) => {
                while (true) {
                    if (index >= sorted.length) {
                        return false;
                    }
                    const error = sorted[index];
                    if (r.end <= error.start) {
                        return false;
                    }
                    if (startEndOverlapsWithStartEnd(r.pos, r.end, error.start, error.start + error.length)) {
                        return true;
                    }
                    index++;
                }
            };
            function rangeHasNoErrors() {
                return false;
            }
        }