function addMs(m, n) {
        var a = dateToUtcArray(m);
        a[6] += n;
        return arrayToUtcDate(a);
    }