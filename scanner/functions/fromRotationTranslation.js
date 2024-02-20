function fromRotationTranslation(out, q, t) {
        var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
        out[0] = bx;
        out[1] = by;
        out[2] = bz;
        out[3] = bw;
        out[4] = ax * bw + ay * bz - az * by;
        out[5] = ay * bw + az * bx - ax * bz;
        out[6] = az * bw + ax * by - ay * bx;
        out[7] = -ax * bx - ay * by - az * bz;
        return out;
    }