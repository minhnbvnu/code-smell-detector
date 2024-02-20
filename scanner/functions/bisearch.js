function bisearch(ucs, data) {
        var min = 0;
        var max = data.length - 1;
        var mid;
        if (ucs < data[0][0] || ucs > data[max][1]) {
            return false;
        }
        while (max >= min) {
            mid = (min + max) >> 1;
            if (ucs > data[mid][1]) {
                min = mid + 1;
            }
            else if (ucs < data[mid][0]) {
                max = mid - 1;
            }
            else {
                return true;
            }
        }
        return false;
    }