function lookupInUnicodeMap(code, map2) {
            if (code < map2[0]) {
                return false;
            }
            let lo = 0;
            let hi = map2.length;
            let mid;
            while (lo + 1 < hi) {
                mid = lo + (hi - lo) / 2;
                mid -= mid % 2;
                if (map2[mid] <= code && code <= map2[mid + 1]) {
                    return true;
                }
                if (code < map2[mid]) {
                    hi = mid;
                }
                else {
                    lo = mid + 2;
                }
            }
            return false;
        }