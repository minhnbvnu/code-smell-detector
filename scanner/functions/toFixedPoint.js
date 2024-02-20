function toFixedPoint(str, e, z) {
        var len, zs;

        // Negative exponent?
        if (e < 0) {

            // Prepend zeros.
            for (zs = z + '.'; ++e; zs += z);
            str = zs + str;

            // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if (++e > len) {
                for (zs = z, e -= len; --e; zs += z);
                str += zs;
            } else if (e < len) {
                str = str.slice(0, e) + '.' + str.slice(e);
            }
        }

        return str;
    }