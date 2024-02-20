function traceSegmentInternal(segments, memo, line, column, bias) {
            let index = memoizedBinarySearch(segments, column, memo, line);
            if (found) {
                index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
            }
            else if (bias === LEAST_UPPER_BOUND)
                index++;
            if (index === -1 || index === segments.length)
                return null;
            return segments[index];
        }