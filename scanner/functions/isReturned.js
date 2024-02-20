function isReturned(segment) {
                const info = segmentInfoMap.get(segment);
                return !info || info.returned;
            }