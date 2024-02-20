function fromQuat2(out, a) {
        var translation = new glMatrix.ARRAY_TYPE(3);
        var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
        var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense
        if (magnitude > 0) {
            translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
            translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
            translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
        }
        else {
            translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
            translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
            translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
        }
        fromRotationTranslation(out, a, translation);
        return out;
    }