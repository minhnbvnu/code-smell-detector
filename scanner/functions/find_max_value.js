function find_max_value(a) {
    if (Array.isArray) {
        if (a.length === 0) { return undefined; }
        let m = a[0], j = 0;
        for (let i = 1; i < a.length; ++i) {
            const v = a[i];
            if (v > m) {
                m = v;
                j = i;
            }
        }
        return j;
    } else {
        let m = -Infinity, j = undefined;
        for (const i in a) {
            const v = a[i];
            if (v > m) {
                m = v;
                j = i;
            }
        }        
        return j;
    }
}