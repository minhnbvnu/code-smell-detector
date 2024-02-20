function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
        var dq = new glMatrix.ARRAY_TYPE(8);
        dq[0] = x1;
        dq[1] = y1;
        dq[2] = z1;
        dq[3] = w1;
        var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
        dq[4] = ax * w1 + ay * z1 - az * y1;
        dq[5] = ay * w1 + az * x1 - ax * z1;
        dq[6] = az * w1 + ax * y1 - ay * x1;
        dq[7] = -ax * x1 - ay * y1 - az * z1;
        return dq;
    }