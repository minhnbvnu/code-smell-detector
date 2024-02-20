function rotateY(out, a, rad) {
        var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
        quat.rotateY(out, a, rad);
        bx = out[0];
        by = out[1];
        bz = out[2];
        bw = out[3];
        out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
        out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
        out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
        out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
        return out;
    }