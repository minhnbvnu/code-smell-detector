function rotateAroundAxis(out, a, axis, rad) {
        //Special case for rad = 0
        if (Math.abs(rad) < glMatrix.EPSILON) {
            return copy(out, a);
        }
        var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
        rad = rad * 0.5;
        var s = Math.sin(rad);
        var bx = s * axis[0] / axisLength;
        var by = s * axis[1] / axisLength;
        var bz = s * axis[2] / axisLength;
        var bw = Math.cos(rad);
        var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
        out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
        out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
        out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
        out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
        var ax = a[4], ay = a[5], az = a[6], aw = a[7];
        out[4] = ax * bw + aw * bx + ay * bz - az * by;
        out[5] = ay * bw + aw * by + az * bx - ax * bz;
        out[6] = az * bw + aw * bz + ax * by - ay * bx;
        out[7] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }