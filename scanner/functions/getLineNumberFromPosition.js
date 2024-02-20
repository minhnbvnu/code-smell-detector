function getLineNumberFromPosition(lineMap, position) {
        if(position === -1) {
            return 0;
        }
        var min = 0;
        var max = lineMap.length - 1;
        while(min < max) {
            var med = (min + max) >> 1;
            if(position < lineMap[med]) {
                max = med - 1;
            } else {
                if(position < lineMap[med + 1]) {
                    min = max = med;
                } else {
                    min = med + 1;
                }
            }
        }
        return min;
    }