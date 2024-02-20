function minmax2(arr, brr) {
        let a;
        let b;
        let a_min = +Infinity;
        let a_max = -Infinity;
        let b_min = +Infinity;
        let b_max = -Infinity;
        const n = Math.min(arr.length, brr.length);
        for (let i = 0; i < n; i++) {
            a = arr[i];
            b = brr[i];
            if (!isNaN(a) && !isNaN(b)) {
                if (a < a_min)
                    a_min = a;
                if (a > a_max)
                    a_max = a;
                if (b < b_min)
                    b_min = b;
                if (b > b_max)
                    b_max = b;
            }
        }
        return [a_min, a_max, b_min, b_max];
    }