function isSegmentBoundary(minIndex) {
                return lastMax !== defaultMax && minIndex !== defaultMin && lastMax < minIndex - 1;
            }