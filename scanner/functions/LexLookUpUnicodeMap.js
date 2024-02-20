function LexLookUpUnicodeMap(code, map) {
        var lo = 0;
        var hi = map.length;
        var mid;
        while(lo + 1 < hi) {
            mid = lo + (hi - lo) / 2;
            mid -= mid % 2;
            if(map[mid] <= code && code <= map[mid + 1]) {
                return true;
            }
            if(code < map[mid]) {
                hi = mid;
            } else {
                lo = mid + 2;
            }
        }
        return false;
    }