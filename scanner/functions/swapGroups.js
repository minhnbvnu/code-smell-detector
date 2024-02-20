function swapGroups(ds1, ds2) {
    for (var i = ds1.length; i--; ) {
        for (var j = 0; j < ds2.length; j++) {
            if (!swap(ds1[i], ds2[j])) {
                while (i < ds1.length) {
                    while (j--) {
                        swap(ds2[j], ds1[i]);
                    }
                    j = ds2.length;
                    i++;
                }                
                return [ds1, ds2];
            }
        }
    }
    ds1.selectionBefore = ds2.selectionBefore = 
    ds1.selectionAfter = ds2.selectionAfter = null;
    return [ds2, ds1];
}