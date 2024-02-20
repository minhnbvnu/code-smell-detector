function getAxisAngle(out_axis, q) {
        var rad = Math.acos(q[3]) * 2.0;
        var s = Math.sin(rad / 2.0);
        if (s > glMatrix.EPSILON) {
            out_axis[0] = q[0] / s;
            out_axis[1] = q[1] / s;
            out_axis[2] = q[2] / s;
        }
        else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            out_axis[0] = 1;
            out_axis[1] = 0;
            out_axis[2] = 0;
        }
        return rad;
    }