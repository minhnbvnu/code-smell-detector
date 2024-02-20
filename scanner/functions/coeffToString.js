function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for (; i < j;) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for (; z--; s = '0' + s);
            r += s;
        }

        // Determine trailing zeros.
        for (j = r.length; r.charCodeAt(--j) === 48;);
        return r.slice(0, j + 1 || 1);
    }