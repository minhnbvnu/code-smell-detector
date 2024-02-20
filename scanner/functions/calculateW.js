function calculateW(out, a) {
        var x = a[0], y = a[1], z = a[2];
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return out;
    }