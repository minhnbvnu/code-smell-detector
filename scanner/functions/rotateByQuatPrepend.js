function rotateByQuatPrepend(out, q, a) {
        var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
        out[0] = qx * bw + qw * bx + qy * bz - qz * by;
        out[1] = qy * bw + qw * by + qz * bx - qx * bz;
        out[2] = qz * bw + qw * bz + qx * by - qy * bx;
        out[3] = qw * bw - qx * bx - qy * by - qz * bz;
        bx = a[4];
        by = a[5];
        bz = a[6];
        bw = a[7];
        out[4] = qx * bw + qw * bx + qy * bz - qz * by;
        out[5] = qy * bw + qw * by + qz * bx - qx * bz;
        out[6] = qz * bw + qw * bz + qx * by - qy * bx;
        out[7] = qw * bw - qx * bx - qy * by - qz * bz;
        return out;
    }